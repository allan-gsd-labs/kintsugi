import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        kbg: 'var(--bg-main)',
        ksurface: 'var(--bg-surface)',
        kfg: 'var(--text-primary)',
        kmuted: 'var(--text-muted)',
        kaccent: 'var(--accent-red)',
        kborder: 'var(--border-subtle)',
      },
      maxWidth: {
        container: '1200px',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 24px 60px rgba(0, 0, 0, 0.45)',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
