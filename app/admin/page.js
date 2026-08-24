'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fixtures, setFixtures] = useState([]);
  const [showFixtureForm, setShowFixtureForm] = useState(false);

  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('Home');

  const [players, setPlayers] = useState([]);
  const [showPlayerForm, setShowPlayerForm] = useState(false);

  const [playerName, setPlayerName] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [bio, setBio] = useState('');

  const [results, setResults] = useState([]);
  const [showResultForm, setShowResultForm] = useState(false);

  const [resultOpponent, setResultOpponent] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [resultVenue, setResultVenue] = useState('Home');
  const [resultNotes, setResultNotes] = useState('');

  async function loadFixtures() {
    try {
      const response = await fetch('/api/fixtures');
      const data = await response.json();

      if (response.ok) {
        setFixtures(data);
      }
    } catch (error) {
      console.error('Failed to load fixtures:', error);
    }
  }

  async function loadPlayers() {
    try {
      const response = await fetch('/api/players');
      const data = await response.json();

      if (response.ok) {
        setPlayers(data);
      }
    } catch (error) {
      console.error('Failed to load players:', error);
    }
  }

  async function loadResults() {
    try {
      const response = await fetch('/api/results');
      const data = await response.json();

      if (response.ok) {
        setResults(data);
      }
    } catch (error) {
      console.error('Failed to load results:', error);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      loadFixtures();
      loadPlayers();
      loadResults();
    }
  }, [loggedIn]);

  function login() {
    if (
      email === 'abubakarfc001@gmail.com' &&
      password === 'Abubakar#1'
    ) {
      setLoggedIn(true);
    } else {
      alert('Incorrect email or password');
    }
  }

  async function addFixture() {
    if (!opponent || !date || !time) {
      alert('Please fill in opponent, date and time.');
      return;
    }

    try {
      const response = await fetch('/api/fixtures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opponent,
          match_date: date,
          match_time: time,
          venue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save fixture.');
        return;
      }

      setFixtures((current) => [data, ...current]);

      setOpponent('');
      setDate('');
      setTime('');
      setVenue('Home');
      setShowFixtureForm(false);

      alert('Fixture saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Could not connect to the database.');
    }
  }

  async function addPlayer() {
    if (!playerName || !position) {
      alert('Please enter the player name and position.');
      return;
    }

    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName,
          jersey_number: jerseyNumber,
          position,
          role,
          photo_url: photoUrl,
          bio,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save player.');
        return;
      }

      setPlayers((current) => [data, ...current]);

      setPlayerName('');
      setJerseyNumber('');
      setPosition('');
      setRole('');
      setPhotoUrl('');
      setBio('');
      setShowPlayerForm(false);

      alert('Player saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Could not connect to the player database.');
    }
  }

  async function addResult() {
    if (!resultOpponent || !resultDate) {
      alert('Please enter the opponent and match date.');
      return;
    }

    const home = Number(homeScore) || 0;
    const away = Number(awayScore) || 0;

    let status = 'Draw';

    if (home > away) {
      status = 'Won';
    } else if (home < away) {
      status = 'Lost';
    }

    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opponent: resultOpponent,
          match_date: resultDate,
          home_score: home,
          away_score: away,
          venue: resultVenue,
          status,
          notes: resultNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save result.');
        return;
      }

      setResults((current) => [data, ...current]);

      setResultOpponent('');
      setResultDate('');
      setHomeScore('');
      setAwayScore('');
      setResultVenue('Home');
      setResultNotes('');
      setShowResultForm(false);

      alert('Result saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Could not connect to the results database.');
    }
  }

  if (!loggedIn) {
    return (
      <main className="admin-page">
        <div className="admin-box">
          <h1>Abubakar FC</h1>

          <h2>Administrator Login</h2>

          <p>
            Sign in to manage the club website.
          </p>

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abubakarfc001@gmail.com"
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button onClick={login}>
            Log in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-dashboard">

        <h1>Abubakar FC Administrator</h1>

        <p>
          Welcome to the club management dashboard.
        </p>

        {/* FIXTURES */}

        <section className="admin-section">

          <div className="section-header">

            <div>
              <h2>Fixtures</h2>

              <p>
                Manage upcoming Abubakar FC matches.
              </p>
            </div>

            <button
              className="primary"
              onClick={() =>
                setShowFixtureForm(!showFixtureForm)
              }
            >
              {showFixtureForm
                ? 'Close'
                : 'Add Fixture'}
            </button>

          </div>

          {showFixtureForm && (
            <div className="form-box">

              <label>
                Opponent

                <input
                  value={opponent}
                  onChange={(e) =>
                    setOpponent(e.target.value)
                  }
                  placeholder="e.g. Mowolowo FC"
                />
              </label>

              <label>
                Date

                <input
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  placeholder="e.g. 5 Sep 2026"
                />
              </label>

              <label>
                Time

                <input
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  placeholder="e.g. 3:00 PM"
                />
              </label>

              <label>
                Venue

                <select
                  value={venue}
                  onChange={(e) =>
                    setVenue(e.target.value)
                  }
                >
                  <option value="Home">
                    Home
                  </option>

                  <option value="Away">
                    Away
                  </option>
                </select>
              </label>

              <button
                className="primary"
                onClick={addFixture}
              >
                Save Fixture
              </button>

            </div>
          )}

          <div className="fixture-list">

            {fixtures.map((fixture) => (
              <div
                className="fixture-item"
                key={fixture.id}
              >
                <div>

                  <strong>
                    Abubakar FC vs {fixture.opponent}
                  </strong>

                  <p>
                    {fixture.match_date} •{' '}
                    {fixture.match_time} •{' '}
                    {fixture.venue}
                  </p>

                </div>
              </div>
            ))}

          </div>

        </section>

        {/* RESULTS */}

        <section className="admin-section">

          <div className="section-header">

            <div>
              <h2>Results</h2>

              <p>
                Record completed matches and scores.
              </p>
            </div>

            <button
              className="primary"
              onClick={() =>
                setShowResultForm(!showResultForm)
              }
            >
              {showResultForm
                ? 'Close'
                : 'Add Result'}
            </button>

          </div>

          {showResultForm && (
            <div className="form-box">

              <label>
                Opponent

                <input
                  value={resultOpponent}
                  onChange={(e) =>
                    setResultOpponent(e.target.value)
                  }
                  placeholder="e.g. Mowolowo FC"
                />
              </label>

              <label>
                Match Date

                <input
                  value={resultDate}
                  onChange={(e) =>
                    setResultDate(e.target.value)
                  }
                  placeholder="e.g. 20 Aug 2026"
                />
              </label>

              <label>
                Abubakar FC Score

                <input
                  type="number"
                  min="0"
                  value={homeScore}
                  onChange={(e) =>
                    setHomeScore(e.target.value)
                  }
                  placeholder="0"
                />
              </label>

              <label>
                Opponent Score

                <input
                  type="number"
                  min="0"
                  value={awayScore}
                  onChange={(e) =>
                    setAwayScore(e.target.value)
                  }
                  placeholder="0"
                />
              </label>

              <label>
                Venue

                <select
                  value={resultVenue}
                  onChange={(e) =>
                    setResultVenue(e.target.value)
                  }
                >
                  <option value="Home">
                    Home
                  </option>

                  <option value="Away">
                    Away
                  </option>
                </select>
              </label>

              <label>
                Notes

                <textarea
                  value={resultNotes}
                  onChange={(e) =>
                    setResultNotes(e.target.value)
                  }
                  placeholder="Optional match notes"
                  rows="4"
                />
              </label>

              <button
                className="primary"
                onClick={addResult}
              >
                Save Result
              </button>

            </div>
          )}

          <div className="fixture-list">

            {results.map((result) => (
              <div
                className="fixture-item"
                key={result.id}
              >
                <div>

                  <strong>
                    Abubakar FC {result.home_score} -{' '}
                    {result.away_score}{' '}
                    {result.opponent}
                  </strong>

                  <p>
                    {result.match_date} •{' '}
                    {result.venue} •{' '}
                    {result.status}
                  </p>

                  {result.notes && (
                    <small>
                      {result.notes}
                    </small>
                  )}

                </div>
              </div>
            ))}

          </div>

        </section>

        {/* PLAYERS */}

        <section className="admin-section">

          <div className="section-header">

            <div>
              <h2>Players</h2>

              <p>
                Manage player profiles and photos.
              </p>
            </div>

            <button
              className="primary"
              onClick={() =>
                setShowPlayerForm(!showPlayerForm)
              }
            >
              {showPlayerForm
                ? 'Close'
                : 'Add Player'}
            </button>

          </div>

          {showPlayerForm && (
            <div className="form-box">

              <label>
                Player Name

                <input
                  value={playerName}
                  onChange={(e) =>
                    setPlayerName(e.target.value)
                  }
                  placeholder="e.g. Abubakar"
                />
              </label>

              <label>
                Jersey Number

                <input
                  value={jerseyNumber}
                  onChange={(e) =>
                    setJerseyNumber(e.target.value)
                  }
                  placeholder="e.g. 15"
                />
              </label>

              <label>
                Position

                <select
                  value={position}
                  onChange={(e) =>
                    setPosition(e.target.value)
                  }
                >
                  <option value="">
                    Select position
                  </option>

                  <option value="Goalkeeper">
                    Goalkeeper
                  </option>

                  <option value="Defender">
                    Defender
                  </option>

                  <option value="Midfielder">
                    Midfielder
                  </option>

                  <option value="Forward">
                    Forward
                  </option>
                </select>
              </label>

              <label>
                Role

                <input
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  placeholder="e.g. Captain"
                />
              </label>

              <label>
                Player Photo URL

                <input
                  value={photoUrl}
                  onChange={(e) =>
                    setPhotoUrl(e.target.value)
                  }
                  placeholder="Paste image URL"
                />
              </label>

              <label>
                Biography

                <textarea
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                  placeholder="Write a short player biography..."
                  rows="5"
                />
              </label>

              <button
                className="primary"
                onClick={addPlayer}
              >
                Save Player
              </button>

            </div>
          )}

          <div className="fixture-list">

            {players.map((player) => (
              <div
                className="fixture-item"
                key={player.id}
              >
                <div>

                  <strong>
                    #{player.jersey_number}{' '}
                    {player.name}
                  </strong>

                  <p>
                    {player.position}

                    {player.role
                      ? ` • ${player.role}`
                      : ''}
                  </p>

                  {player.photo_url && (
                    <img
                      src={player.photo_url}
                      alt={player.name}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        marginTop: '10px',
                      }}
                    />
                  )}

                </div>
              </div>
            ))}

          </div>

        </section>

        {/* OTHER SECTIONS */}

        <div className="admin-grid">

          <div>
            <h2>Achievements</h2>

            <p>
              Add trophies, honours and milestones.
            </p>

            <button>
              Manage Achievements
            </button>
          </div>

          <div>
            <h2>Legends</h2>

            <p>
              Manage your club legends and profiles.
            </p>

            <button>
              Manage Legends
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}
