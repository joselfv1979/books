import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const features = [
  {
    title: "Smart Search",
    desc: "Find books instantly by title, author, or genre with intelligent filtering and fuzzy matching.",
    icon: "⌕",
  },
  {
    title: "Real-Time Availability",
    desc: "See live copy counts before placing a loan. No more hunting for books that aren't there.",
    icon: "◈",
  },
  {
    title: "Personal Dashboard",
    desc: "Track active loans, due dates, and borrowing history from a single, elegant panel.",
    icon: "⊞",
  },
  {
    title: "Genre Exploration",
    desc: "Discover curated categories from literary fiction to dystopian thrillers. Something for every shelf.",
    icon: "⊡",
  },
];

const services = [
  {
    title: "Loan Management",
    desc: "Reserve, renew, and return books with a few clicks. Entirely frictionless.",
  },
  {
    title: "User Accounts",
    desc: "Secure authentication with personalized preferences and role-based access.",
  },
  {
    title: "Smart Notifications",
    desc: "Timely reminders for due dates, reserved books ready for pickup, and library updates.",
  },
];

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx("opacity-0 animate-fade-up", delay && `delay-${delay}`, className)}
    >
      {children}
    </div>
  );
}

const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-0 h-[600px] gradient-glow pointer-events-none" />

      {/* Hero */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={100}>
              <span className="inline-block text-gold-400 text-xs tracking-[0.2em] uppercase font-sans font-medium mb-6">
                Est. 2026 — Digital Reading Room
              </span>
            </FadeIn>

            <FadeIn delay={200}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight text-balance">
                Your Smart
                <br />
                <span className="italic text-gold-400">Digital Library</span>
              </h1>
            </FadeIn>

            <FadeIn delay={300} className="mt-6 max-w-2xl">
              <p className="text-lg md:text-xl text-ink-300 leading-relaxed font-sans font-light">
                Browse, borrow, and manage books effortlessly. A refined experience
                crafted for readers and administrators alike.
              </p>
            </FadeIn>

            <FadeIn delay={400} className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/books" className="btn btn-primary text-base px-8 py-3">
                Browse Collection
              </Link>
              <Link to="/login" className="btn btn-outline text-base px-8 py-3">
                Sign In
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="layout-container">
        <div className="w-24 h-px bg-[color-mix(in_srgb,var(--color-gold-500)_30%,transparent)] mx-auto" />
      </div>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={100}>
              <span className="inline-block text-gold-400 text-xs tracking-[0.2em] uppercase font-sans font-medium mb-3">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-14">
                Everything you need,
                <br />
                <span className="italic text-gold-400">nothing you don&rsquo;t</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={200 + i * 100}>
                <div className="card card-hover group h-full flex flex-col">
                  <span className="text-2xl text-gold-400 mb-4 block font-serif" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3 className="text-lg font-serif font-semibold mb-3 text-ink-50">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-300 leading-relaxed font-sans flex-1">
                    {f.desc}
                  </p>
                  <div className="mt-4 pt-4 border-t border-page-border">
                    <span className="text-xs text-[color-mix(in_srgb,var(--color-gold-500)_60%,transparent)] font-sans tracking-wider uppercase">
                      Explore →
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="layout-container">
        <div className="w-24 h-px bg-[color-mix(in_srgb,var(--color-gold-500)_30%,transparent)] mx-auto" />
      </div>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="layout-container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeIn delay={100}>
              <span className="inline-block text-gold-400 text-xs tracking-[0.2em] uppercase font-sans font-medium mb-3">
                Behind the Scenes
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Built for
                <br />
                <span className="italic text-gold-400">seamless service</span>
              </h2>
              <p className="text-ink-300 leading-relaxed font-sans font-light mb-8 max-w-md">
                Every feature is designed to reduce friction and delight users — 
                from the moment they sign in to the day they return their last book.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {services.map((s, i) => (
                <FadeIn key={s.title} delay={200 + i * 100}>
                  <div className="card card-hover group flex items-start gap-5">
                    <span className="text-gold-400 font-serif text-xl mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1 text-ink-50">
                        {s.title}
                      </h3>
                      <p className="text-sm text-ink-300 leading-relaxed font-sans">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="layout-container">
        <div className="w-24 h-px bg-[color-mix(in_srgb,var(--color-gold-500)_30%,transparent)] mx-auto" />
      </div>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="layout-container">
          <FadeIn delay={100}>
            <div className="relative overflow-hidden rounded-sm border border-[color-mix(in_srgb,var(--color-gold-500)_20%,transparent)] bg-gradient-to-br from-page-card via-page-card to-[color-mix(in_srgb,var(--color-gold-500)_5%,transparent)] p-10 md:p-16 text-center">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='%23c8913e' fill-opacity='0.3'/%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px',
                }}
              />
              <div className="relative z-10">
                <span className="inline-block text-gold-400 text-xs tracking-[0.2em] uppercase font-sans font-medium mb-4">
                  Join the reading room
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                  Ready to get started?
                </h2>
                <p className="text-ink-300 max-w-lg mx-auto mb-8 font-sans font-light">
                  Create an account in under a minute, or browse our collection
                  as a guest.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/login" className="btn btn-primary text-base px-8 py-3">
                    Sign In
                  </Link>
                  <Link to="/books" className="btn btn-outline text-base px-8 py-3">
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
};

export default LandingPage;
