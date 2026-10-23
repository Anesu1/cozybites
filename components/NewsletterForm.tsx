"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { buttonStyle, ButtonLabel } from "./framer/Button";
import type { MotionProps } from "./framer/motion";
import { T } from "./framer/tokens";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const copy = site.footer.newsletter;

export function NewsletterForm({ motion }: { motion: MotionProps }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [empty, setEmpty] = useState(true);
  const inputId = useId();
  const statusId = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    // Client-side check is a convenience only; the API validates again.
    if (!EMAIL_RE.test(email) || email.length > 254) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: String(data.get("website") ?? "") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setEmpty(true);
      setStatus({ state: "success", message: "Thank you! You’re on the list." });
    } catch {
      setStatus({ state: "error", message: "Sorry, we couldn’t sign you up just now. Please try again." });
    }
  }

  return (
    <>
      <form
        className="framer-1s429mj"
        data-framer-name="Newsletter Form"
        noValidate
        onSubmit={onSubmit}
        aria-describedby={statusId}
        {...motion}
        style={{ backgroundColor: T.surfaceMuted, borderRadius: 99, ...motion.style }}
      >
        <div
          className="framer-form-text-input framer-form-input-wrapper framer-ebw1v1"
          data-framer-name="Email"
          style={{
            ["--framer-input-background" as string]: "rgba(0, 0, 0, 0)",
            ["--framer-input-font-color" as string]: T.ink,
            ["--framer-input-icon-mask-image" as string]: "none",
            ["--framer-input-placeholder-color" as string]: T.placeholder,
          }}
        >
          <label htmlFor={inputId} className="cb-visually-hidden">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder={copy.placeholder}
            className={`framer-form-input${empty ? " framer-form-input-empty" : ""}`}
            onChange={(e) => setEmpty(e.currentTarget.value === "")}
            aria-invalid={status.state === "error" || undefined}
          />
        </div>
        <div className="framer-1x0gmhp-container" data-framer-name="Sign Up Button">
          <button
            type="submit"
            className="framer-T4OGZ framer-90xug framer-thht0c framer-v-thht0c"
            data-border="true"
            data-framer-name="Default"
            data-reset="button"
            disabled={status.state === "sending"}
            style={buttonStyle(T.surface, T.border)}
          >
            <ButtonLabel
              label={status.state === "sending" ? "Signing up…" : copy.button}
              color={T.ink}
              classes={["framer-wzqo2u", "framer-vl51k", "framer-16mqzgk", "framer-u9lmne"]}
            />
          </button>
        </div>
        {/* Honeypot: hidden from people, often filled by bots. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="cb-honeypot" defaultValue="" />
      </form>
      <p id={statusId} className="cb-form-status" data-state={status.state} role="status" aria-live="polite">
        {status.message}
      </p>
    </>
  );
}
