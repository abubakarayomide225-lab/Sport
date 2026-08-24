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
        <p>Welcome to the club management dashboard.</p>

        <section className="admin-section">
          <div className="section-header">
            <div>
              <h2>Fixtures</h2>
              <p>Manage upcoming Abubakar FC matches.</p>
            </div>

            <button
              className="primary"
              onClick={() => setShowFixtureForm(!showFixtureForm)}
            >
              {showFixtureForm ? 'Close' : 'Add Fixture'}
            </button>
          </div>

          {showFixtureForm && (
            <div className="form-box">
              <label>
                Opponent
                <input
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  placeholder="e.g. Mowolowo FC"
                />
              </label>

              <label>
                Date
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 5 Sep 2026"
                />
              </label>

              <label>
                Time
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 3:00 PM"
                />
              </label>

              <label>
                Venue
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                >
                  <option value="Home">Home</option>
                  <option value="Away">Away</option>
                </select>
              </label>

              <button className="primary" onClick={addFixture}>
                Save Fixture
              </button>
            </div>
          )}

          <div className="fixture-list">
            {fixtures.map((fixture) => (
              <div className="fixture-item" key={fixture.id}>
                <div>
                  <strong>
                    Abubakar FC vs {fixture.opponent}
                  </strong>

                  <p>
                    {fixture.match_date} • {fixture.match_time} •{' '}
                    {fixture.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="admin-grid">
          <div>
            <h2>Results</h2>
            <p>Update completed matches and scores.</p>
            <button>Add Result</button>
          </div>

          <div>
            <h2>Players</h2>
            <p>Manage player names, numbers and positions.</p>
            <button>Manage Players</button>
          </div>

          <div>
            <h2>Achievements</h2>
            <p>Add trophies, honours and milestones.</p>
            <button>Manage Achievements</button>
          </div>

          <div>
            <h2>Legends</h2>
            <p>Manage your club legends and their profiles.</p>
            <button>Manage Legends</button>
          </div>
        </div>
      </div>
    </main>
  );
}
