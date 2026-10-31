import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { contact } from "../content";
import { useInView } from "../hooks/useInView";
import Divider from "./Divider";
import SectionTitle from "./SectionTitle";

const UNDERLINE = "· ".repeat(70);

// Prompt style form. Real labels and real inputs, styled only.
export default function Contact() {
  const [state, handleSubmit] = useForm(contact.formId);
  const prompt = useRef<HTMLDivElement>(null);
  const seen = useInView(prompt, { threshold: 0.5 });
  const [settled, setSettled] = useState(false);
  const [tick, setTick] = useState(0);

  // The cursor starts blinking a moment after the section has settled.
  useEffect(() => {
    if (!seen) return;
    const id = window.setTimeout(() => setSettled(true), 500);
    return () => window.clearTimeout(id);
  }, [seen]);

  useEffect(() => {
    if (!state.submitting) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 120);
    return () => window.clearInterval(id);
  }, [state.submitting]);

  const filled = tick % 9;
  const formErrors = state.errors?.getFormErrors?.() ?? [];

  return (
    <section id="contact" className="sec">
      <Divider variant="dots" />
      <SectionTitle text="contact" />

      <p className="contact-copy">
        The quickest way to reach me is <span className="sel">{contact.email}</span>. You can also find me on{" "}
        <a className="lnk" href={contact.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
          <span className="ext" aria-hidden="true">
            ↗
          </span>
        </a>{" "}
        or use the form below.
      </p>

      <div ref={prompt} className={`prompt${settled ? " settled" : ""}`}>
        {state.succeeded ? (
          <p className="ok" role="status">
            &gt; message sent. i will reply soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">name</label>
              <span className="gt" aria-hidden="true">
                &gt;
              </span>
              <input id="name" name="name" type="text" autoComplete="name" placeholder=" " required />
              <span className="cur cursor" aria-hidden="true">
                ▌
              </span>
            </div>
            <div className="ul" aria-hidden="true">
              {UNDERLINE}
            </div>
            <ValidationError prefix="Name" field="name" errors={state.errors} className="err" />

            <div className="field">
              <label htmlFor="email">email</label>
              <span className="gt" aria-hidden="true">
                &gt;
              </span>
              <input id="email" name="email" type="email" autoComplete="email" placeholder=" " required />
            </div>
            <div className="ul" aria-hidden="true">
              {UNDERLINE}
            </div>
            <ValidationError prefix="Email" field="email" errors={state.errors} className="err" />

            <div className="field">
              <label htmlFor="message">message</label>
              <span className="gt" aria-hidden="true">
                &gt;
              </span>
              <textarea id="message" name="message" rows={4} placeholder=" " required />
            </div>
            <div className="ul" aria-hidden="true">
              {UNDERLINE}
            </div>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="err" />

            {formErrors.length > 0 && (
              <p className="err" role="alert">
                &gt; could not send. check the fields above and try again.
              </p>
            )}

            <div className="send">
              {state.submitting ? (
                <span className="loader" role="status">
                  sending [{"■".repeat(filled)}
                  {"□".repeat(8 - filled)}]
                </span>
              ) : (
                <button type="submit" className="btn">
                  send message
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
