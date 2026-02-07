type LabeledLink = {
  label: string;
  url: string;
};

type Member = {
  name: string;
  role: string;
};

type EPKSectionProps = {
  bio: string;
  members: Member[];
  ffo: string[];
  links: LabeledLink[];
  downloads: LabeledLink[];
};

export function EPKSection({
  bio,
  members,
  ffo,
  links,
  downloads,
}: EPKSectionProps) {
  return (
    <section
      id="epk"
      className="section-panel texture-soft section-space px-6 py-8 md:px-8 md:py-10"
    >
      <p className="section-eyebrow">Press</p>
      <h2 className="section-heading">EPK</h2>
      <div className="panel-divider" />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3>Bio</h3>
          <p className="mt-4 text-text-muted">{bio}</p>
        </div>
        <div>
          <h3>Members</h3>
          <ul className="mt-4 space-y-2 text-text-muted">
            {members.map((member) => (
              <li key={`${member.name}-${member.role}`}>
                {member.name} - {member.role}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>FFO</h3>
          <p className="mt-4 text-text-muted">{ffo.join(' - ')}</p>
        </div>
        <div>
          <h3>Links</h3>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  className="text-text-muted transition-colors duration-150 hover:text-accent-red"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3>Downloads</h3>
        <ul className="mt-4 space-y-2">
          {downloads.map((item) => (
            <li key={item.label}>
              <a
                href={item.url}
                className="text-text-muted transition-colors duration-150 hover:text-accent-red"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
