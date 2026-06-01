import process from "node:process";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormsResult =
  | { success: true; message?: string }
  | { success: false; error: string };

export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type NewsletterPayload = {
  email: string;
};

function getWeb3FormsConfig() {
  return {
    apiKey: process.env.WEB3FORMS_API_KEY ?? "b7731bd7-d2c7-4ef4-a381-8cdcba6e953d",
    toEmail: process.env.CONTACT_EMAIL ?? "zylancetechnologies@gmail.com",
    contactSubject:
      process.env.WEB3FORMS_SUBJECT ?? "New contact message from Xylance Technologies website",
    newsletterSubject:
      process.env.WEB3FORMS_NEWSLETTER_SUBJECT ??
      "New newsletter subscription from Xylance Technologies website",
  };
}

export async function submitToWeb3Forms(
  payload: Record<string, unknown>,
): Promise<Web3FormsResult> {
  const { apiKey } = getWeb3FormsConfig();

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: apiKey,
        ...payload,
      }),
    });

    const responseText = await response.text();
    let responseJson: { success?: boolean; message?: string } | null = null;

    try {
      responseJson = JSON.parse(responseText) as { success?: boolean; message?: string };
    } catch {
      console.error("Web3Forms: failed to parse response", responseText);
    }

    if (!response.ok || !responseJson?.success) {
      const errorMessage =
        responseJson?.message ||
        responseText ||
        "Unable to complete the request at this time.";
      console.error("Web3Forms error:", { status: response.status, body: responseText });
      return { success: false, error: errorMessage };
    }

    return { success: true, message: responseJson.message };
  } catch (error) {
    console.error("Web3Forms request failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error. Please try again.",
    };
  }
}

export async function sendContactForm(data: ContactFormPayload): Promise<Web3FormsResult> {
  const { toEmail, contactSubject } = getWeb3FormsConfig();

  const formattedMessage = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service Required: ${data.service}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  return submitToWeb3Forms({
    to: toEmail,
    subject: contactSubject,
    from_name: data.name,
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    message: formattedMessage,
    replyto: data.email,
  });
}

export async function sendNewsletterSubscription(
  data: NewsletterPayload,
): Promise<Web3FormsResult> {
  const { toEmail, newsletterSubject } = getWeb3FormsConfig();

  return submitToWeb3Forms({
    to: toEmail,
    subject: newsletterSubject,
    from_name: "Newsletter Subscriber",
    name: "Newsletter Subscriber",
    email: data.email,
    message: `New newsletter subscription request.\n\nSubscriber email: ${data.email}`,
    subscriber_email: data.email,
  });
}
