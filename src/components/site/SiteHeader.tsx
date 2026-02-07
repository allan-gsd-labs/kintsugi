type AnchorItem = {
  id: string;
  label: string;
};

type SiteHeaderProps = {
  anchors: AnchorItem[];
  activeAnchor: string;
};

export function SiteHeader({ anchors, activeAnchor }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-bg-main/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-site gap-6 px-6 py-4">
        {anchors.map((anchor) => {
          const isActive = activeAnchor === anchor.id;

          return (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="relative text-xs uppercase tracking-[0.2em] text-text-muted hover:text-text-primary"
            >
              {anchor.label}
              <span
                className={`absolute -bottom-2 left-0 h-px w-full bg-accent-red transition-opacity duration-150 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden
              />
            </a>
          );
        })}
      </nav>
    </header>
  );
}

