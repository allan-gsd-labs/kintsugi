type EmailSignupFormProps = {
  placeholder: string;
  submitText: string;
};

export function EmailSignupForm({
  placeholder,
  submitText,
}: EmailSignupFormProps) {
  return (
    <form className="mt-10 max-w-xl space-y-4 rounded-md border border-border-subtle bg-bg-surface/40 p-4">
      <div className="space-y-2">
        <label htmlFor="email-signup" className="text-sm text-text-muted">
          Email address
        </label>
        <input
          id="email-signup"
          name="email"
          type="email"
          required
          placeholder={placeholder}
          className="w-full rounded-md border border-border-subtle bg-bg-main px-3 py-2 text-text-primary placeholder:text-text-muted"
        />
      </div>
      <button
        type="submit"
        className="rounded-md border border-border-subtle px-4 py-2 text-sm text-text-primary transition-colors duration-150 hover:border-accent-red hover:text-accent-red"
      >
        {submitText}
      </button>
    </form>
  );
}

