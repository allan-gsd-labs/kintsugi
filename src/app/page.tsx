'use client';

import type { MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ContactSection } from '@/components/site/ContactSection';
import { EPKSection } from '@/components/site/EPKSection';
import { Footer } from '@/components/site/Footer';
import { GigsSection } from '@/components/site/GigsSection';
import { HeroSection } from '@/components/site/HeroSection';
import { MerchSection } from '@/components/site/MerchSection';
import { MusicSection } from '@/components/site/MusicSection';
import { SiteHeader } from '@/components/site/SiteHeader';
import { StatementSection } from '@/components/site/StatementSection';
import gigsData from '../../content/gigs.json';
import merchData from '../../content/merch.json';
import siteData from '../../content/site.json';

type Gig = {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  notes?: string;
};

const anchors = [
  { id: 'home', label: 'Home' },
  { id: 'music', label: 'Music' },
  { id: 'gigs', label: 'Gigs' },
  { id: 'merch', label: 'Merch' },
  { id: 'epk', label: 'EPK' },
  { id: 'contact', label: 'Contact' },
];

const socialLinks = [
  { label: 'Linktree', url: siteData.socials.linktree },
  { label: 'Bandcamp', url: siteData.socials.bandcamp },
].filter((item) => item.url);

const findNextShow = (shows: Gig[]) => {
  const today = new Date();
  const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date));

  return (
    sorted.find((show) => new Date(`${show.date}T00:00:00`) >= today) ?? null
  );
};

const bandcampEmbedUrl =
  'https://bandcamp.com/EmbeddedPlayer/track=2053798318/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/';

export default function Home() {
  const [activeAnchor, setActiveAnchor] = useState('home');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionIds = useMemo(() => anchors.map((anchor) => anchor.id), []);
  const nextShow = findNextShow(gigsData.upcoming as Gig[]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveAnchor(visible[0].target.id);
        }
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: '-35% 0px -45% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  const handleNavigate = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      window.history.replaceState(null, '', `#${id}`);
      setActiveAnchor(id);
    },
    [prefersReducedMotion],
  );

  return (
    <main className="page-shell">
      <SiteHeader
        anchors={anchors}
        activeAnchor={activeAnchor}
        onNavigate={handleNavigate}
      />
      <HeroSection
        headline={siteData.headline}
        subhead={siteData.subhead}
        showSignup
      />
      <MusicSection bandcampEmbedUrl={bandcampEmbedUrl} />
      <GigsSection nextShow={nextShow} pastShows={gigsData.past as Gig[]} />
      <StatementSection text="Built from fracture. Forged to endure." />
      <MerchSection products={merchData.products} />
      <EPKSection
        bio={siteData.epk.bio}
        members={siteData.epk.members}
        ffo={siteData.epk.ffo}
        links={siteData.epk.links}
        downloads={siteData.epk.downloads}
      />
      <ContactSection
        bookingEmail={siteData.emails.booking}
        generalEmail={siteData.emails.general}
        socialLinks={socialLinks}
      />
      <Footer showSignup socialLinks={socialLinks} />
    </main>
  );
}
