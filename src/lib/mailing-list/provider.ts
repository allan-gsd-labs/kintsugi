export type MailingListPayload = {
  email: string;
  source?: string;
};

type MailingListProvider = {
  subscribe: (payload: MailingListPayload) => Promise<void>;
};

class ConsoleProvider implements MailingListProvider {
  async subscribe(payload: MailingListPayload): Promise<void> {
    console.info('[mailing-list] console provider subscription', payload);
  }
}

export function getMailingListProvider(): MailingListProvider {
  const provider = (process.env.MAILING_LIST_PROVIDER ?? 'console').toLowerCase();

  if (provider === 'console') {
    return new ConsoleProvider();
  }

  console.warn(
    `[mailing-list] unknown provider "${provider}", falling back to console provider`,
  );
  return new ConsoleProvider();
}

