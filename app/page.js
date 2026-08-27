"use client";

import { useEffect, useMemo, useState } from "react";

const defaultFixtures = [
  {
    opponent: "Abubakar ",
    match_date: "25 Aug 2026",
    match_time: "12:00 PM",
    venue: "Home",
  },
  {
    opponent: "abubakar United",
    match_date: "30 Aug 2026",
    match_time: "4:00 PM",
    venue: "Away",
  },
  {
    opponent: "Ogbomoso City FC",
    match_date: "6 Sep 2026",
    match_time: "3:00 PM",
    venue: "Home",
  },
];

const defaultResults = [
  {
    opponent: "Ajaawa United",
    score: "2 - 1",
    result: "W",
    date: "18 Aug 2026",
  },
  {
    opponent: "Mowolowo FC",
    score: "1 - 1",
    result: "D",
    date: "11 Aug 2026",
  },
  {
    opponent: "Ilorin Stars",
    score: "3 - 0",
    result: "W",
    date: "4 Aug 2026",
  },
];

const defaultPlayers = [
  {
    name: "ABUBAKAR",
    position: "Captain",
    number: "15",
  },
  {
    name: "BOLUWATIFE",
    position: "Forward",
    number: "9",
  },
  {
    name: "HAMMED",
    position: "Midfielder",
    number: "4",
  },
  {
    name: "AKINADE",
    position: "Defender",
    number: "16",
  },
];

const legends = [
  {
    name: "Club Legend",
    role: "Abubakar FC Legend",
    icon: "👑",
  },
  {
    name: "Club Icon",
    role: "Abubakar FC Icon",
    icon: "⭐",
  },
  {
    name: "Club Hero",
    role: "Abubakar FC Hero",
    icon: "🏆",
  },
];

const achievements = [
  {
    title: "Club Excellence",
    description: "Building a strong football culture and competitive team.",
    icon: "🏆",
  },
  {
    title: "Team Spirit",
    description: "United by passion, discipline and the love of football.",
    icon: "🤝",
  },
  {
    title: "Future Champions",
    description: "Developing players and creating opportunities for the next generation.",
    icon: "🌟",
  },
];

export default function HomePage() {
  const [fixtures, setFixtures] = useState(defaultFixtures);
  const [players, setPlayers] = useState(defaultPlayers);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fixtureResponse = await fetch("/api/fixtures", {
          cache: "no-store",
        });

        if (fixtureResponse.ok) {
          const data = await fixtureResponse.json();

          if (Array.isArray(data) && data.length > 0) {
            setFixtures(data);
          } else if (Array.isArray(data?.fixtures) && data.fixtures.length > 0) {
            setFixtures(data.fixtures);
          }
        }
      } catch (error) {
        console.log("Using default fixtures:", error);
      }

      try {
        const playerResponse = await fetch("/api/players", {
          cache: "no-store",
        });

        if (playerResponse.ok) {
          const data = await playerResponse.json();

          if (Array.isArray(data) && data.length > 0) {
            setPlayers(data);
          } else if (Array.isArray(data?.players) && data.players.length > 0) {
            setPlayers(data.players);
          }
        }
      } catch (error) {
        console.log("Using default players:", error);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const nextFixture = useMemo(() => {
    return fixtures[0] || defaultFixtures[0];
  }, [fixtures]);

  const featuredPlayers = players.slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#07552f] text-lg font-black text-[#e3b341] shadow-md">
              AF
            </div>

            <div>
              <p className="text-lg font-black tracking-wide text-[#07552f]">
                ABUBAKAR FC
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Football Club
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a href="/" className="font-semibold text-[#07552f]">
              Home
            </a>
            <a
              href="/fixtures"
              className="font-medium text-slate-600 transition hover:text-[#07552f]"
            >
              Fixtures
            </a>
            <a
              href="/results"
              className="font-medium text-slate-600 transition hover:text-[#07552f]"
            >
              Results
            </a>
            <a
              href="/players"
              className="font-medium text-slate-600 transition hover:text-[#07552f]"
            >
              Players
            </a>
            <a
              href="/legends"
              className="font-medium text-slate-600 transition hover:text-[#07552f]"
            >
              Legends
            </a>
            <a
              href="/achievements"
              className="font-medium text-slate-600 transition hover:text-[#07552f]"
            >
              Achievements
            </a>
            <a
              href="/admin"
              className="rounded-full bg-[#07552f] px-5 py-2.5 font-bold text-white transition hover:bg-[#053f22]"
            >
              Admin
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-slate-200 p-2 text-[#07552f] md:hidden"
            aria-label="Open menu"
          >
            <span className="block text-xl">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {[
                ["Home", "/"],
                ["Fixtures", "/fixtures"],
                ["Results", "/results"],
                ["Players", "/players"],
                ["Legends", "/legends"],
                ["Achievements", "/achievements"],
                ["Admin", "/admin"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-slate-700"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#e3b341]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#07552f]/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e3b341]/40 bg-[#e3b341]/10 px-4 py-2 text-sm font-bold text-[#07552f]">
              <span>⚽</span>
              <span>WELCOME TO ABUBAKAR FC</span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-[#07552f] sm:text-6xl lg:text-7xl">
              Passion.
              <br />
              <span className="text-[#e3b341]">Pride.</span>
              <br />
              Football.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Welcome to the official home of Abubakar FC — a football club
              built on passion, discipline, unity and the ambition to become
              champions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/fixtures"
                className="rounded-full bg-[#07552f] px-7 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#053f22]"
              >
                View Fixtures →
              </a>

              <a
                href="/players"
                className="rounded-full border-2 border-[#07552f] px-7 py-3.5 font-bold text-[#07552f] transition hover:bg-[#07552f] hover:text-white"
              >
                Meet The Players
              </a>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative mx-auto flex aspect-square max-w-md items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#07552f] shadow-2xl">
              <div className="absolute inset-5 rounded-[2rem] border border-[#e3b341]/30" />
              <div className="absolute inset-10 rounded-full border-2 border-[#e3b341]/30" />

              <div className="text-center">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#e3b341] bg-white shadow-xl">
                  <span className="text-4xl font-black text-[#07552f]">
                    AF
                  </span>
                </div>

                <h2 className="mt-7 text-3xl font-black tracking-wide text-white">
                  ABUBAKAR FC
                </h2>

                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#e3b341]">
                  United By Football
                </p>
              </div>

              <div className="absolute left-6 top-6 text-3xl">⚽</div>
              <div className="absolute bottom-6 right-6 text-3xl">🏆</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLUB STATS */}
      <section className="bg-[#07552f]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-5 py-8 md:grid-cols-4 lg:px-8">
          <Stat number="2026" label="Club Season" />
          <Stat number="100%" label="Team Spirit" />
          <Stat number="∞" label="Ambition" />
          <Stat number="1" label="United Club" />
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="LATEST NEWS"
          title="Club Announcements"
          description="Stay updated with the latest news, match information and important announcements from Abubakar FC."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Announcement
            icon="📢"
            title="Match Day"
            text="The next Abubakar FC fixture is approaching. Get ready to support the team."
          />
          <Announcement
            icon="⚽"
            title="Team Update"
            text="Follow our official website for squad updates, fixtures and results."
          />
          <Announcement
            icon="🏆"
            title="Our Ambition"
            text="We continue to build a stronger team with championship ambitions."
          />
        </div>
      </section>

      {/* NEXT FIXTURE */}
      <section className="bg-slate-50 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="MATCH CENTRE"
            title="Next Fixture"
            description="The next challenge for Abubakar FC."
          />

          <div className="mt-10 overflow-hidden rounded-3xl bg-[#07552f] shadow-xl">
            <div className="grid items-center lg:grid-cols-[1fr_auto_1fr]">
              <TeamSide name="ABUBAKAR FC" badge="AF" align="right" />

              <div className="px-6 py-10 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#e3b341]">
                  {nextFixture?.match_date || "25 Aug 2026"}
                </p>

                <div className="my-4 text-5xl font-black text-white">VS</div>

                <p className="text-white/80">
                  {nextFixture?.match_time || "12:00 PM"}
                </p>

                <p className="mt-2 text-sm text-white/60">
                  📍 {nextFixture?.venue || "Home"}
                </p>
              </div>

              <TeamSide
                name={nextFixture?.opponent || "Mowolowo FC"}
                badge="FC"
                align="left"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/fixtures"
              className="inline-flex rounded-full bg-[#e3b341] px-7 py-3 font-bold text-[#07552f] transition hover:bg-[#d5a52d]"
            >
              View All Fixtures
            </a>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="MATCH CENTRE"
          title="Recent Results"
          description="See how Abubakar FC has performed in recent matches."
        />

        <div className="mt-10 grid gap-4">
          {defaultResults.map((result, index) => (
            <div
              key={`${result.opponent}-${index}`}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {result.date}
                </p>
                <p className="mt-1 font-bold text-[#07552f]">
                  Abubakar FC vs {result.opponent}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-black ${
                    result.result === "W"
                      ? "bg-green-100 text-green-700"
                      : result.result === "D"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {result.result}
                </span>

                <span className="text-2xl font-black text-slate-800">
                  {result.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="/results"
            className="font-bold text-[#07552f] hover:text-[#e3b341]"
          >
            View All Results →
          </a>
        </div>
      </section>

      {/* PLAYERS */}
      <section className="bg-[#f6f7f5] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="THE SQUAD"
            title="Featured Players"
            description="Meet some of the players representing Abubakar FC."
          />

          {loading ? (
            <div className="mt-10 text-center text-slate-500">
              Loading players...
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPlayers.map((player, index) => (
                <PlayerCard
                  key={`${player.name}-${index}`}
                  player={player}
                />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="/players"
              className="inline-flex rounded-full bg-[#07552f] px-7 py-3 font-bold text-white hover:bg-[#053f22]"
            >
              View Full Squad
            </a>
          </div>
        </div>
      </section>

      {/* LEGENDS */}
      <section className="bg-[#07552f] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#e3b341]">
              CLUB HISTORY
            </p>

            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              The Legends
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Honouring the players and personalities who have helped shape
              the identity of Abubakar FC.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {legends.map((legend) => (
              <div
                key={legend.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e3b341] text-4xl">
                  {legend.icon}
                </div>

                <h3 className="mt-5 text-xl font-black text-white">
                  {legend.name}
                </h3>

                <p className="mt-2 text-sm text-white/60">{legend.role}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/legends"
              className="inline-flex rounded-full border-2 border-[#e3b341] px-7 py-3 font-bold text-[#e3b341] transition hover:bg-[#e3b341] hover:text-[#07552f]"
            >
              Explore Our Legends
            </a>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading
          eyebrow="OUR JOURNEY"
          title="Achievements & Ambitions"
          description="Every milestone is part of the journey. Every match is an opportunity to grow."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3b341]/15 text-3xl">
                {achievement.icon}
              </div>

              <h3 className="mt-6 text-xl font-black text-[#07552f]">
                {achievement.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/achievements"
            className="font-bold text-[#07552f] hover:text-[#e3b341]"
          >
            View All Achievements →
          </a>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#e3b341] px-6 py-12 text-center shadow-xl sm:px-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#07552f]">
            ONE CLUB. ONE FAMILY.
          </p>

          <h2 className="mt-3 text-4xl font-black text-[#07552f] sm:text-5xl">
            Welcome to Abubakar FC
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[#07552f]/80">
            Follow the journey, support the players and be part of the future
            of Abubakar FC.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href="/fixtures"
              className="rounded-full bg-[#07552f] px-7 py-3.5 font-bold text-white hover:bg-[#053f22]"
            >
              Follow Fixtures
            </a>

            <a
              href="/players"
              className="rounded-full border-2 border-[#07552f] px-7 py-3.5 font-bold text-[#07552f] hover:bg-[#07552f] hover:text-white"
            >
              Meet The Squad
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#053f22] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e3b341] font-black text-[#07552f]">
                AF
              </div>

              <div>
                <p className="font-black tracking-wide">ABUBAKAR FC</p>
                <p className="text-xs text-white/50">
                  United By Football
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm leading-7 text-white/60">
              The official digital home of Abubakar FC. Follow our fixtures,
              results, players, legends and achievements.
            </p>
          </div>

          <div>
            <h3 className="font-black text-[#e3b341]">Quick Links</h3>

            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <a href="/" className="hover:text-white">
                Home
              </a>
              <a href="/fixtures" className="hover:text-white">
                Fixtures
              </a>
              <a href="/results" className="hover:text-white">
                Results
              </a>
              <a href="/players" className="hover:text-white">
                Players
              </a>
              <a href="/legends" className="hover:text-white">
                Legends
              </a>
              <a href="/achievements" className="hover:text-white">
                Achievements
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#e3b341]">Club</h3>

            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>⚽ Football</p>
              <p>🏆 Ambition</p>
              <p>🤝 Unity</p>
              <p>⭐ Excellence</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Abubakar FC. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

function Stat({ number, label }) {
  return (
    <div className="px-4 text-center">
      <p className="text-3xl font-black text-[#e3b341] sm:text-4xl">{number}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.3em] text-[#e3b341]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-4xl font-black tracking-tight text-[#07552f] sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function Announcement({ icon, title, text }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07552f] text-2xl">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-black text-[#07552f]">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{text}</p>

      <a
        href="/fixtures"
        className="mt-5 inline-block font-bold text-[#07552f] hover:text-[#e3b341]"
      >
        Read More →
      </a>
    </article>
  );
}

function TeamSide({ name, badge, align }) {
  return (
    <div
      className={`flex items-center gap-5 px-6 py-10 ${
        align === "right"
          ? "justify-center lg:justify-end"
          : "justify-center lg:justify-start"
      }`}
    >
      <div
        className={`flex flex-col ${
          align === "right" ? "items-end" : "items-start"
        }`}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-white/50">
          Club
        </p>
        <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">
          {name}
        </h3>
      </div>

      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-[#e3b341] bg-white text-xl font-black text-[#07552f] shadow-lg">
        {badge}
      </div>
    </div>
  );
}

function PlayerCard({ player }) {
  const name = player?.name || player?.player_name || "Player";
  const position = player?.position || player?.role || "Footballer";
  const number = player?.number || player?.jersey_number || "—";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-56 items-center justify-center bg-[#07552f]">
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#e3b341] font-black text-[#07552f]">
          {number}
        </div>

        {player?.image || player?.photo || player?.image_url ? (
          <img
            src={player.image || player.photo || player.image_url}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#e3b341] bg-white text-3xl font-black text-[#07552f]">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-[#07552f]">{name}</h3>
        <p className="mt-1 text-sm font-medium text-slate-500">{position}</p>
      </div>
    </article>
  );
}
