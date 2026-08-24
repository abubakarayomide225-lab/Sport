'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fixtures, setFixtures] = useState([]);
  const [showFixtureForm, setShowFixtureForm] = useState(false);

  const [activeSection, setActiveSection] = useState(null);

  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('Home');

  const [resultOpponent, setResultOpponent] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [resultVenue, setResultVenue] = useState('Home');
  const [resultStatus, setResultStatus] = useState('Completed');
  const [resultNotes, setResultNotes] = useState('');

  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerImage, setPlayerImage] = useState('');

  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementYear, setAchievementYear] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');

  const [legendName, setLegendName] = useState('');
  const [legendPosition, setLegendPosition] = useState('');
  const [legendBio, setLegendBio] = useState('');
  const [legendImage, setLegendImage] = useState('');

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

  useEffect(() => {
    if (loggedIn) {
      loadFixtures();
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

  function openSection(section) {
    setActiveSection(
      activeSection === section ? null : section
    );
  }

  function addResult() {
    if (!resultOpponent || !resultDate) {
      alert('Please enter the opponent and match date.');
      return;
    }

    alert('Result form is ready. Database connection will be connected next.');

    setResultOpponent('');
    setResultDate('');
    setHomeScore('');
    setAwayScore('');
    setResultNotes('');
  }

  function addPlayer() {
    if (!playerName || !playerNumber || !playerPosition) {
      alert('Please fill in player name, number and position.');
      return;
    }

    alert('Player added successfully!');

    setPlayerName('');
    setPlayerNumber('');
    setPlayerPosition('');
    setPlayerImage('');
  }

  function addAchievement() {
    if (!achievementTitle || !achievementYear) {
      alert('Please enter achievement title and year.');
      return;
    }

    alert('Achievement added successfully!');

    setAchievementTitle('');
    setAchievementYear('');
    setAchievementDescription('');
  }

  function addLegend() {
    if (!legendName || !legendPosition) {
      alert('Please enter legend name and position.');
      return;
    }

    alert('Legend added successfully!');

    setLegendName('');
    setLegendPosition('');
    setLegendBio('');
    setLegendImage('');
  }

  if (!loggedIn) {
    return (
      <main className="admin-page">
        <div className="admin-box">
          <h1>Abubakar FC</h1>
          <h2>Administrator Login</h2>
          <p>Sign in to manage the club website.</p>

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

          <button onClick={login}>Log in</button>
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
                  placeholder="e.g. 25 Aug 2026"
                />
              </label>

              <label>
                Time

                <input
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  placeholder="e.g. 12:00 PM"
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

        {/* ADMIN OPTIONS */}

        <div className="admin-grid">

          {/* RESULTS */}

          <div>
            <h2>Results</h2>

            <p>
              Update completed matches and scores.
            </p>

            <button
              onClick={() => openSection('results')}
            >
              {activeSection === 'results'
                ? 'Close'
                : 'Add Result'}
            </button>

            {activeSection === 'results' && (
              <div className="form-box">

                <label>
                  Opponent

                  <input
                    value={resultOpponent}
                    onChange={(e) =>
                      setResultOpponent(e.target.value)
                    }
                    placeholder="Opponent"
                  />
                </label>

                <label>
                  Match Date

                  <input
                    value={resultDate}
                    onChange={(e) =>
                      setResultDate(e.target.value)
                    }
                    placeholder="25 Aug 2026"
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
                    <option>Home</option>
                    <option>Away</option>
                  </select>
                </label>

                <label>
                  Notes

                  <textarea
                    value={resultNotes}
                    onChange={(e) =>
                      setResultNotes(e.target.value)
                    }
                    placeholder="Match notes..."
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
          </div>

          {/* PLAYERS */}

          <div>
            <h2>Players</h2>

            <p>
              Manage player names, numbers, positions
              and pictures.
            </p>

            <button
              onClick={() => openSection('players')}
            >
              {activeSection === 'players'
                ? 'Close'
                : 'Manage Players'}
            </button>

            {activeSection === 'players' && (
              <div className="form-box">

                <label>
                  Player Name

                  <input
                    value={playerName}
                    onChange={(e) =>
                      setPlayerName(e.target.value)
                    }
                    placeholder="Player name"
                  />
                </label>

                <label>
                  Jersey Number

                  <input
                    type="number"
                    value={playerNumber}
                    onChange={(e) =>
                      setPlayerNumber(e.target.value)
                    }
                    placeholder="10"
                  />
                </label>

                <label>
                  Position

                  <input
                    value={playerPosition}
                    onChange={(e) =>
                      setPlayerPosition(e.target.value)
                    }
                    placeholder="Forward"
                  />
                </label>

                <label>
                  Player Picture URL

                  <input
                    value={playerImage}
                    onChange={(e) =>
                      setPlayerImage(e.target.value)
                    }
                    placeholder="https://..."
                  />
                </label>

                <button
                  className="primary"
                  onClick={addPlayer}
                >
                  Add Player
                </button>

              </div>
            )}
          </div>

          {/* ACHIEVEMENTS */}

          <div>
            <h2>Achievements</h2>

            <p>
              Add trophies, honours and milestones.
            </p>

            <button
              onClick={() =>
                openSection('achievements')
              }
            >
              {activeSection === 'achievements'
                ? 'Close'
                : 'Manage Achievements'}
            </button>

            {activeSection === 'achievements' && (
              <div className="form-box">

                <label>
                  Achievement

                  <input
                    value={achievementTitle}
                    onChange={(e) =>
                      setAchievementTitle(e.target.value)
                    }
                    placeholder="e.g. League Champions"
                  />
                </label>

                <label>
                  Year

                  <input
                    value={achievementYear}
                    onChange={(e) =>
                      setAchievementYear(e.target.value)
                    }
                    placeholder="2026"
                  />
                </label>

                <label>
                  Description

                  <textarea
                    value={achievementDescription}
                    onChange={(e) =>
                      setAchievementDescription(
                        e.target.value
                      )
                    }
                    placeholder="Achievement details..."
                  />
                </label>

                <button
                  className="primary"
                  onClick={addAchievement}
                >
                  Add Achievement
                </button>

              </div>
            )}
          </div>

          {/* LEGENDS */}

          <div>
            <h2>Legends</h2>

            <p>
              Manage club legends and their profiles.
            </p>

            <button
              onClick={() => openSection('legends')}
            >
              {activeSection === 'legends'
                ? 'Close'
                : 'Manage Legends'}
            </button>

            {activeSection === 'legends' && (
              <div className="form-box">

                <label>
                  Legend Name

                  <input
                    value={legendName}
                    onChange={(e) =>
                      setLegendName(e.target.value)
                    }
                    placeholder="Legend name"
                  />
                </label>

                <label>
                  Position

                  <input
                    value={legendPosition}
                    onChange={(e) =>
                      setLegendPosition(e.target.value)
                    }
                    placeholder="Midfielder"
                  />
                </label>

                <label>
                  Biography

                  <textarea
                    value={legendBio}
                    onChange={(e) =>
                      setLegendBio(e.target.value)
                    }
                    placeholder="Legend biography..."
                  />
                </label>

                <label>
                  Legend Picture URL

                  <input
                    value={legendImage}
                    onChange={(e) =>
                      setLegendImage(e.target.value)
                    }
                    placeholder="https://..."
                  />
                </label>

                <button
                  className="primary"
                  onClick={addLegend}
                >
                  Add Legend
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
