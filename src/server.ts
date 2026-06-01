import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { isValidEmail } from "./lib/validation";
import {
  sendContactForm,
  sendNewsletterSubscription,
  type ContactFormPayload,
} from "./lib/web3forms.server";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function handleContactRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  let payload: Partial<ContactFormPayload>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const service = payload.service?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !phone || !service || !message) {
    return jsonResponse(
      { error: "Name, email, phone, service, and message are required." },
      400,
    );
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Please provide a valid email address." }, 400);
  }

  const result = await sendContactForm({ name, email, phone, service, message });

  if (!result.success) {
    return jsonResponse({ error: result.error }, 502);
  }

  return jsonResponse({ success: true, message: result.message }, 200);
}

async function handleNewsletterRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  let payload: { email?: string };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const email = payload.email?.trim() ?? "";

  if (!email) {
    return jsonResponse({ error: "Email is required." }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: "Please provide a valid email address." }, 400);
  }

  const result = await sendNewsletterSubscription({ email });

  if (!result.success) {
    return jsonResponse({ error: result.error }, 502);
  }

  return jsonResponse({ success: true, message: result.message }, 200);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      if (url.pathname === "/api/contact") {
        return await handleContactRequest(request);
      }

      if (url.pathname === "/api/newsletter") {
        return await handleNewsletterRequest(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
