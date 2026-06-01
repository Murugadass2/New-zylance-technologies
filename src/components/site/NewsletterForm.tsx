import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { subscribeNewsletter, validateNewsletterEmail } from "@/lib/web3forms";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateNewsletterEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await subscribeNewsletter(email);
      toast.success("Successfully subscribed to our newsletter.");
      setEmail("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to subscribe. Please try again later.";
      setError(message);
      toast.error(message);
      console.error("Newsletter subscription failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row glass rounded-xl p-1.5"
        noValidate
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Your email"
          aria-label="Email for newsletter"
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          disabled={isSubmitting}
          className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold transition-opacity",
            isSubmitting && "opacity-70 cursor-not-allowed",
          )}
        >
          {isSubmitting ? (
            <>
              <Spinner className="h-3.5 w-3.5" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {error && (
        <p id="newsletter-error" className="mt-2 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
