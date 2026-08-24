'use client';

import { useEffect, useState } from 'react';

const defaultFixtures = [
  {
    opponent: 'Mowolowo FC',
    match_date: '25 Aug 2026',
    match_time: '12:00 PM',
    venue: 'Home',
  },
  {
    opponent: 'Ajaawa United',
    match_date: '30 Aug 2026',
    match_time: '4:00 PM',
    venue: 'Away',
  },
];

const results = [
  {
    opponent: 'Oke-Odo FC',
    score: '3 - 1',
    status: 'Won',
  },
  {
    opponent: 'Igbogbo FC',
    score: '2 - 2',
    status: 'Draw',
  },
];

const defaultPlayers = [
  {
    id: '1',
    jersey_number: '01',
    name: 'Olusanjo',
    position: 'Goalkeeper',
    role: '',
    photo_url: '',
    bio: 'Reliable goalkeeper for Abubakar FC.',
  },
  {
    id: '2',
    jersey_number: '15',
    name: 'Abubakar',
    position: 'Defender',
    role: 'Captain',
    photo_url: '',
    bio: 'Club captain and defensive leader.',
  },
  {
    id: '3',
    jersey_number: '05',
    name: 'Gbotemi',
    position: 'Defender',
    role: '',
    photo_url: '',
    bio: 'Strong and composed defender.',
  },
  {
    id: '4',
    jersey_number: '06',
    name: 'Sudiq',
    position: 'Midfielder',
    role: '',
    photo_url: '',
    bio: 'Energetic midfielder who helps control the game.',
  },
  {
    id: '5',
    jersey_number: '09',
    name: 'Boluwatife',
    position: 'Forward',
    role: '',
    photo_url: '',
    bio: 'Attacking player with an eye for goal.',
  },
  {
    id: '6',
    jersey_number: '11',
    name: 'Pepe',
    position: 'Forward',
    role: '',
    photo_url: '',
    bio: 'Forward who brings pace and attacking energy.',
  },
];

export default function Home() {
  const [tab, setTab] = useState('home');
  const [fixtures, setFixtures] = useState(defaultFixtures);
  const [players, setPlayers] = useState(defaultPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    fetch('/api/fixtures')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFixtures(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/players')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPlayers(data);
        }
      })
      .catch(() => {});
  }, []);

  const navigation = [
    'home',
    'fixtures',
    'results',
    'players',
    'legends',
    'achievements',
  ];

  return (
    <main>
      <header>
        <div className="brand">
          <div className="crest">AF</div>

          <div>
            <b>ABUBAKAR FC</b>
            <span>
              Raising unknown talent into unstoppable football stars.
            </span>
          </div>
        </div>

        <nav>
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={tab === item ? 'active' : ''}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          <a href="/admin">Administrator</a>
        </nav>
      </header>

      {tab === 'home' && (
        <section className="hero">
          <div>
            <p className="eyebrow">
              WELCOME TO THE OFFICIAL CLUB SITE
            </p>

            <h1>
              ABUBAKAR
              <br />
              <em>FOOTBALL CLUB</em>
            </h1>

            <p className="lead">
              Follow our fixtures, results, legends, achievements
              and players — all in one place.
            </p>

            <div>
              <button
                className="primary"
                onClick={() => setTab('fixtures')}
              >
                View fixtures
              </button>

              <button
                className="ghost"
                onClick={() => setTab('players')}
              >
                Meet the squad
              </button>
            </div>
          </div>

          <div className="heroCard">
            <span>UP NEXT</span>

            <h3>Abubakar FC</h3>

            <strong>VS</strong>

            <h3>{fixtures[0]?.opponent || 'Mowolowo FC'}</h3>

            <p>
              {fixtures[0]?.match_date || '25 AUGUST 2026'} •{' '}
              {fixtures[0]?.match_time || '12:00 PM'}
            </p>
          </div>
        </section>
      )}

      {tab === 'fixtures' && (
        <section className="content">
          <p className="eyebrow">MATCH SCHEDULE</p>
          <h2>Fixtures</h2>

          <div className="grid">
            {fixtures.map((fixture, index) => (
              <article
                className="card"
                key={fixture.id || index}
              >
                <p className="position">
                  {fixture.venue || 'Home'}
                </p>

                <h3>
                  Abubakar FC vs {fixture.opponent}
                </h3>

                <p>
                  {fixture.match_date || fixture.date} •{' '}
                  {fixture.match_time || fixture.time}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'results' && (
        <section className="content">
          <p className="eyebrow">MATCH HISTORY</p>
          <h2>Results</h2>

          <div className="grid">
            {results.map((result, index) => (
              <article className="card" key={index}>
                <p className="position">{result.status}</p>

                <h3>
                  Abubakar FC {result.score} {result.opponent}
                </h3>

                <p>Completed match</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'players' && (
        <section className="content">
          <p className="eyebrow">THE SQUAD</p>

          <h2>Players</h2>

          <p className="lead">
            Meet the players representing Abubakar FC.
          </p>

          <div className="grid">
            {players.map((player) => (
              <article
                className="player profile-card"
                key={player.id || player.name}
                onClick={() => setSelectedPlayer(player)}
              >
                <div className="player-photo">
                  {player.photo_url ? (
                    <img
                      src={player.photo_url}
                      alt={player.name}
                    />
                  ) : (
                    <div className="player-initials">
                      {player.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="jersey">
                    {player.jersey_number}
                  </span>
                </div>

                <div className="profile-info">
                  <p className="position">
                    {player.position}

                    {player.role
                      ? ` • ${player.role}`
                      : ''}
                  </p>

                  <h3>{player.name}</h3>

                  <button
                    className="ghost small"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedPlayer(player);
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === 'legends' && (
        <section className="content">
          <p className="eyebrow">OUR HISTORY</p>

          <h2>Club Legends</h2>

          <div className="legend">
            <div className="avatar">★</div>

            <div>
              <h3>The players who built the story</h3>

              <p>
                This section is ready for legendary players,
                photos, biographies and career statistics.
              </p>
            </div>
          </div>
        </section>
      )}

      {tab === 'achievements' && (
        <section className="content">
          <p className="eyebrow">OUR HONOURS</p>

          <h2>Achievements</h2>

          <div className="grid">
            <article className="card">
              <h3>Club Honours</h3>
              <p>
                Add trophies, tournament wins and milestones
                here.
              </p>
            </article>

            <article className="card">
              <h3>2026 Campaign</h3>
              <p>
                Track the season record and major moments.
              </p>
            </article>
          </div>
        </section>
      )}

      <footer>
        <b>ABUBAKAR FC</b>
        <span>Official club website • © 2026</span>
      </footer>

      {selectedPlayer && (
        <div
          className="modal"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="player-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelectedPlayer(null)}
            >
              ×
            </button>

            <div className="modal-player-photo">
              {selectedPlayer.photo_url ? (
                <img
                  src={selectedPlayer.photo_url}
                  alt={selectedPlayer.name}
                />
              ) : (
                <div className="player-initials large">
                  {selectedPlayer.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className="modal-details">
              <span className="eyebrow">
                #{selectedPlayer.jersey_number}
              </span>

              <h2>{selectedPlayer.name}</h2>

              <h3>
                {selectedPlayer.position}

                {selectedPlayer.role
                  ? ` • ${selectedPlayer.role}`
                  : ''}
              </h3>

              <p>
                {selectedPlayer.bio ||
                  'Player profile information will be added by the administrator.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
