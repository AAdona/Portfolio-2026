import { useForm, ValidationError } from "@formspree/react";

const linkClass =
  "underline decoration-line underline-offset-4 transition-colors hover:decoration-fg";

const fieldClass =
  "w-full rounded border border-line bg-transparent px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-muted";

export default function Contact() {
  const [state, handleSubmit] = useForm("mpqebzzd");

  return (
    <section id="contact" className="mx-auto max-w-3xl border-t border-line px-6 py-16">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">Contact</h2>
      <p className="max-w-xl text-body">
        The quickest way to reach me is{" "}
        <a href="mailto:adrianheroadona@gmail.com" className={linkClass}>
          adrianheroadona@gmail.com
        </a>
        . You can also find me on{" "}
        <a href="https://linkedin.com/in/ahadona" target="_blank" rel="noreferrer" className={linkClass}>
          LinkedIn
        </a>{" "}
        or use the form below.
      </p>

      {state.succeeded ? (
        <p className="mt-10 text-body">Thanks, your message has been sent.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-muted">
              Name
            </label>
            <input id="name" type="text" name="name" required className={fieldClass} />
            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-red-400" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-muted">
              Email
            </label>
            <input id="email" type="email" name="email" required className={fieldClass} />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-400" />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm text-muted">
              Message
            </label>
            <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-none`} />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-400" />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className="rounded border border-fg px-5 py-2 text-sm transition-colors hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:hover:bg-transparent"
          >
            {state.submitting ? "Sending" : "Send message"}
          </button>
        </form>
      )}
    </section>
  );
}
