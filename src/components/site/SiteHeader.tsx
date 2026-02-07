import type { MouseEvent } from 'react';

type AnchorItem = {
  id: string;
  label: string;
};

type SiteHeaderProps = {
  anchors: AnchorItem[];
  activeAnchor: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
};

export function SiteHeader({
  anchors,
  activeAnchor,
  onNavigate,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle/80 bg-bg-main/90 backdrop-blur">
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-6 py-4">
        <a
          href="#home"
          onClick={(event) => onNavigate?.(event, 'home')}
          className="text-xs uppercase tracking-[0.24em] text-text-primary"
        >
          Kintsugi
        </a>
        <nav aria-label="Primary" className="flex flex-wrap justify-end gap-x-6 gap-y-2">
          {anchors.map((anchor) => {
            const isActive = activeAnchor === anchor.id;

            return (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                onClick={(event) => onNavigate?.(event, anchor.id)}
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
      </div>
    </header>
  );
}
