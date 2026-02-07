'use client';

import type { FormEvent } from 'react';
import { useId, useState } from 'react';

type EmailSignupFormProps = {
  placeholder: string;
  submitText: string;
  source?: string;
};

export function EmailSignupForm({
  placeholder,
  submitText,
  source,
}: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const emailInputId = useId();
  const honeypotInputId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setFeedback('');

    try {
      const response = await fetch('/api/mailing-list', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          website,
          source,
        }),
      });

      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus('error');
        setFeedback(data.error ?? 'Could not subscribe. Please try again.');
        return;
      }

      setEmail('');
      setWebsite('');
      setStatus('success');
      setFeedback('Subscribed. We will be in touch.');
    } catch {
      setStatus('error');
      setFeedback('Could not subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 max-w-xl space-y-4 rounded-md border border-border-subtle bg-bg-surface/40 p-4"
    >
      <div className="space-y-2">
        <label htmlFor={emailInputId} className="text-sm text-text-muted">
          Email address
        </label>
        <input
          id={emailInputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-md border border-border-subtle bg-bg-main px-3 py-2 text-text-primary placeholder:text-text-muted"
        />
      </div>
      <div className="sr-only" aria-hidden>
        <label htmlFor={honeypotInputId}>Leave this field empty</label>
        <input
          id={honeypotInputId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md border border-border-subtle px-4 py-2 text-sm text-text-primary transition-colors duration-150 hover:border-accent-red hover:text-accent-red"
      >
        {isSubmitting ? 'Submitting...' : submitText}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${
          status === 'error' ? 'text-accent-red' : 'text-text-muted'
        }`}
      >
        {feedback}
      </p>
    </form>
  );
}
