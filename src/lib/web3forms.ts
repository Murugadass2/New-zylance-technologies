import { isValidEmail } from "@/lib/validation";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const config = {
  accessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "b7731bd7-d2c7-4ef4-a381-8cdcba6e953d",
  toEmail: import.meta.env.VITE_WEB3FORMS_TO_EMAIL ?? "zylancetechnologies@gmail.com",
  contactSubject:
    import.meta.env.VITE_WEB3FORMS_SUBJECT ??
    "New contact message from Xylance Technologies website",
  newsletterSubject:
    import.meta.env.VITE_WEB3FORMS_NEWSLETTER_SUBJECT ??
    "New newsletter subscription from Xylance Technologies website",
};

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!isValidEmail(data.email)) errors.email = "Please enter a valid email address.";
  if (!data.phone.trim()) errors.phone = "Phone is required.";
  if (!data.service.trim()) errors.service = "Please select a service.";
  if (!data.message.trim()) errors.message = "Message is required.";

  return errors;
}

export function validateNewsletterEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required.";
  if (!isValidEmail(trimmed)) return "Please enter a valid email address.";
  return null;
}

type Web3FormsResponse = {
  success: boolean;
  message?: string;
};

async function postToWeb3Forms(payload: Record<string, unknown>): Promise<void> {
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: config.accessKey,
        ...payload,
      }),
    });

    let result: Web3FormsResponse | null = null;
    const responseText = await response.text();

    try {
      result = JSON.parse(responseText) as Web3FormsResponse;
    } catch {
      console.error("Web3Forms: invalid JSON response", responseText.slice(0, 200));
    }

    if (!response.ok || !result?.success) {
      const errorMessage =
        result?.message || "Unable to complete the request. Please try again later.";
      console.error("Web3Forms error:", { status: response.status, body: responseText.slice(0, 500) });
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof Error) throw error;
    console.error("Web3Forms request failed:", error);
    throw new Error("Network error. Please check your connection and try again.");
  }
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const validationErrors = validateContactForm(data);
  if (Object.keys(validationErrors).length > 0) {
    const firstError = Object.values(validationErrors)[0];
    throw new Error(firstError ?? "Please fix the errors in the form.");
  }

  const formattedMessage = [
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Service Required: ${data.service.trim()}`,
    "",
    "Message:",
    data.message.trim(),
  ].join("\n");

  await postToWeb3Forms({
    to: config.toEmail,
    subject: config.contactSubject,
    from_name: data.name.trim(),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    service: data.service.trim(),
    message: formattedMessage,
    replyto: data.email.trim(),
    botcheck: "",
  });
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const emailError = validateNewsletterEmail(email);
  if (emailError) throw new Error(emailError);

  const trimmedEmail = email.trim();

  await postToWeb3Forms({
    to: config.toEmail,
    subject: config.newsletterSubject,
    from_name: "Newsletter Subscriber",
    name: "Newsletter Subscriber",
    email: trimmedEmail,
    message: `New newsletter subscription request.\n\nSubscriber email: ${trimmedEmail}`,
    subscriber_email: trimmedEmail,
    botcheck: "",
  });
}
