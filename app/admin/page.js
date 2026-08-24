'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [players, setPlayers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [legends, setLegends] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [activeSection, setActiveSection] = useState(null);
  const [loading, setLoading] = useState(false);

  // FIXTURE
  const [opponent, setOpponent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('Home');

  // RESULT
  const [resultOpponent, setResultOpponent] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [resultVenue, setResultVenue] = useState('Home');
  const [resultStatus, setResultStatus] = useState('Completed');
  const [resultNotes, setResultNotes] = useState('');

  // PLAYER
  const [playerName, setPlayerName] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerImage, setPlayerImage] = useState('');

  // ACHIEVEMENT
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementYear, setAchievementYear] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [achievementImage, setAchievementImage] = useState('');

  // LEGEND
  const [legendName, setLegendName] = useState('');
  const [legendPosition, setLegendPosition] = useState('');
  const [legendBio, setLegendBio] = useState('');
  const [legendImage, setLegendImage] = useState('');

  // ANNOUNCEMENT
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDate, setAnnouncementDate] = useState('');
  const [announcementType, setAnnouncementType] = useState('General');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementImage, setAnnouncementImage] = useState('');

  async function loadData() {
    setLoading(true);

    try {
      const [
        fixturesResponse,
        resultsResponse,
        playersResponse,
        achievementsResponse,
        legendsResponse,
        announcementsResponse,
      ] = await Promise.all([
        fetch('/api/fixtures'),
        fetch('/api/results'),
        fetch('/api/players'),
        fetch('/api/achievements'),
        fetch('/api/legends'),
        fetch('/api/announcements'),
      ]);

      if (fixturesResponse.ok) {
        setFixtures(await fixturesResponse.json());
      }

      if (resultsResponse.ok) {
        setResults(await resultsResponse.json());
      }

      if (playersResponse.ok) {
        setPlayers(await playersResponse.json());
      }

      if (achievementsResponse.ok) {
        setAchievements(await achievementsResponse.json());
      }

      if (legendsResponse.ok) {
        setLegends(await legendsResponse.json());
      }

      if (announcementsResponse.ok) {
        setAnnouncements(await announcementsResponse.json());
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      loadData();
    }
  }, [loggedIn]);

  function login() {
    if (
      email === 'abubakarfc001@gmail.com' &&
      password === 'Abubakar#1'
    ) {
      setLoggedIn(true);
    } else {
      alert('Incorrect email or password.');
    }
  }

  function openSection(section) {
    setActiveSection(
      activeSection === section ? null : section
    );
  }

  // Converts selected picture into a displayable permanent data URL.
  function handleImageUpload(file, setter) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setter(reader.result);
    };

    reader.onerror = () => {
      alert('Unable to read the image.');
    };

    reader.readAsDataURL(file);
  }

  async function addFixture() {
    if (!opponent || !date || !time) {
      alert('Opponent, date and time are required.');
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

      alert('Fixture saved permanently.');
    } catch (error) {
      console.error(error);
      alert('Failed to save fixture.');
    }
  }

  async function addResult() {
    if (!resultOpponent || !resultDate) {
      alert('Opponent and match date are required.');
      return;
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
          home_score: Number(homeScore) || 0,
          away_score: Number(awayScore) || 0,
          venue: resultVenue,
          status: resultStatus,
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
      setResultStatus('Completed');
      setResultNotes('');

      alert('Result saved permanently.');
    } catch (error) {
      console.error(error);
      alert('Failed to save result.');
    }
  }

  async function addPlayer() {
    if (!playerName || !playerNumber || !playerPosition) {
      alert('Player name, number and position are required.');
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
          number: Number(playerNumber),
          position: playerPosition,
          image_url: playerImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save player.');
        return;
      }

      setPlayers((current) => [data, ...current]);

      setPlayerName('');
      setPlayerNumber('');
      setPlayerPosition('');
      setPlayerImage('');

      alert('Player saved permanently.');
    } catch (error) {
      console.error(error);
      alert('Failed to save player.');
    }
  }

  async function addAchievement() {
    if (!achievementTitle || !achievementYear) {
      alert('Achievement title and year are required.');
      return;
    }

    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: achievementTitle,
          year: achievementYear,
          description: achievementDescription,
          image_url: achievementImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save achievement.');
        return;
      }

      setAchievements((current) => [data, ...current]);

      setAchievementTitle('');
      setAchievementYear('');
      setAchievementDescription('');
      setAchievementImage('');

      alert('Achievement saved permanently.');
    } catch (error) {
      console.error(error);
      alert('Failed to save achievement.');
    }
  }

  async function addLegend() {
    if (!legendName || !legendPosition) {
      alert('Legend name and position are required.');
      return;
    }

    try {
      const response = await fetch('/api/legends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: legendName,
          position: legendPosition,
          bio: legendBio,
          image_url: legendImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to save legend.');
        return;
      }

      setLegends((current) => [data, ...current]);

      setLegendName('');
      setLegendPosition('');
      setLegendBio('');
      setLegendImage('');

      alert('Legend saved permanently.');
    } catch (error) {
      console.error(error);
      alert('Failed to save legend.');
    }
  }

  async function addAnnouncement() {
    if (!announcementTitle || !announcementMessage) {
      alert('Announcement title and message are required.');
      return;
    }

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: announcementTitle,
          announcement_date:
            announcementDate ||
            new Date().toLocaleDateString('en-GB'),
          announcement_type: announcementType,
          message: announcementMessage,
          image_url: announcementImage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to publish announcement.');
        return;
      }

      setAnnouncements((current) => [data, ...current]);

      setAnnouncementTitle('');
      setAnnouncementDate('');
      setAnnouncementType('General');
      setAnnouncementMessage('');
      setAnnouncementImage('');

      alert('Announcement published permanently.');
    } catch (error) {
      console.error(error);
      alert('Failed to publish announcement.');
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

        <div className="admin-top">
          <div>
            <h1>Abubakar FC Administrator</h1>
            <p>
              Manage everything from one dashboard.
            </p>
          </div>

          <button
            onClick={() => {
              setLoggedIn(false);
              setEmail('');
              setPassword('');
            }}
          >
            Log out
          </button>
        </div>

        {loading && (
          <p>
            Loading club data...
          </p>
        )}

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
              onClick={() => openSection('fixtures')}
            >
              {activeSection === 'fixtures'
                ? 'Close'
                : 'Add Fixture'}
            </button>
          </div>

          {activeSection === 'fixtures' && (
            <div className="form-box">

              <label>
                Opponent
                <input
                  value={opponent}
                  onChange={(e) =>
                    setOpponent(e.target.value)
                  }
                  placeholder="Mowolowo FC"
                />
              </label>

              <label>
                Match Date
                <input
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  placeholder="25 Aug 2026"
                />
              </label>

              <label>
                Match Time
                <input
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  placeholder="12:00 PM"
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
                  <option>Home</option>
                  <option>Away</option>
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

          <div className="admin-records">
            {fixtures.map((fixture) => (
              <div
                className="record"
                key={fixture.id}
              >
                <strong>
                  Abubakar FC vs {fixture.opponent}
                </strong>

                <p>
                  {fixture.match_date} •{' '}
                  {fixture.match_time} •{' '}
                  {fixture.venue}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="admin-grid">

          {/* RESULTS */}

          <section className="admin-card">
            <h2>Results</h2>
            <p>
              Add completed match results and scores.
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
                  />
                </label>

                <label>
                  Match Date
                  <input
                    value={resultDate}
                    onChange={(e) =>
                      setResultDate(e.target.value)
                    }
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
                  Status
                  <select
                    value={resultStatus}
                    onChange={(e) =>
                      setResultStatus(e.target.value)
                    }
                  >
                    <option>Completed</option>
                    <option>Won</option>
                    <option>Draw</option>
                    <option>Lost</option>
                  </select>
                </label>

                <label>
                  Notes
                  <textarea
                    value={resultNotes}
                    onChange={(e) =>
                      setResultNotes(e.target.value)
                    }
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
          </section>

          {/* PLAYERS */}

          <section className="admin-card">
            <h2>Players</h2>
            <p>
              Add player profiles and pictures.
            </p>

            <button
              onClick={() => openSection('players')}
            >
              {activeSection === 'players'
                ? 'Close'
                : 'Add Player'}
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
                  Player Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        e.target.files?.[0],
                        setPlayerImage
                      )
                    }
                  />
                </label>

                {playerImage && (
                  <img
                    src={playerImage}
                    alt="Player preview"
                    className="image-preview"
                  />
                )}

                <button
                  className="primary"
                  onClick={addPlayer}
                >
                  Add Player
                </button>
              </div>
            )}
          </section>

          {/* ACHIEVEMENTS */}

          <section className="admin-card">
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
                : 'Add Achievement'}
            </button>

            {activeSection === 'achievements' && (
              <div className="form-box">

                <label>
                  Achievement
                  <input
                    value={achievementTitle}
                    onChange={(e) =>
                      setAchievementTitle(
                        e.target.value
                      )
                    }
                    placeholder="League Champions"
                  />
                </label>

                <label>
                  Year
                  <input
                    value={achievementYear}
                    onChange={(e) =>
                      setAchievementYear(
                        e.target.value
                      )
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
                  />
                </label>

                <label>
                  Achievement Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        e.target.files?.[0],
                        setAchievementImage
                      )
                    }
                  />
                </label>

                {achievementImage && (
                  <img
                    src={achievementImage}
                    alt="Achievement preview"
                    className="image-preview"
                  />
                )}

                <button
                  className="primary"
                  onClick={addAchievement}
                >
                  Add Achievement
                </button>
              </div>
            )}
          </section>

          {/* LEGENDS */}

          <section className="admin-card">
            <h2>Legends</h2>
            <p>
              Manage club legends and their profiles.
            </p>

            <button
              onClick={() => openSection('legends')}
            >
              {activeSection === 'legends'
                ? 'Close'
                : 'Add Legend'}
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
                  />
                </label>

                <label>
                  Legend Picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        e.target.files?.[0],
                        setLegendImage
                      )
                    }
                  />
                </label>

                {legendImage && (
                  <img
                    src={legendImage}
                    alt="Legend preview"
                    className="image-preview"
                  />
                )}

                <button
                  className="primary"
                  onClick={addLegend}
                >
                  Add Legend
                </button>
              </div>
            )}
          </section>

          {/* ANNOUNCEMENTS */}

          <section className="admin-card announcement-card">

            <h2>Announcements</h2>

            <p>
              Publish club news, important notices
              and matchday announcements.
            </p>

            <button
              onClick={() =>
                openSection('announcements')
              }
            >
              {activeSection === 'announcements'
                ? 'Close'
                : 'Create Announcement'}
            </button>

            {activeSection === 'announcements' && (
              <div className="form-box">

                <label>
                  Announcement Title

                  <input
                    value={announcementTitle}
                    onChange={(e) =>
                      setAnnouncementTitle(
                        e.target.value
                      )
                    }
                    placeholder="Important Club Announcement"
                  />
                </label>

                <label>
                  Date

                  <input
                    value={announcementDate}
                    onChange={(e) =>
                      setAnnouncementDate(
                        e.target.value
                      )
                    }
                    placeholder="24 Aug 2026"
                  />
                </label>

                <label>
                  Type

                  <select
                    value={announcementType}
                    onChange={(e) =>
                      setAnnouncementType(
                        e.target.value
                      )
                    }
                  >
                    <option>General</option>
                    <option>Club News</option>
                    <option>Matchday</option>
                    <option>Transfer</option>
                    <option>Important</option>
                  </select>
                </label>

                <label>
                  Announcement Message

                  <textarea
                    rows="8"
                    value={announcementMessage}
                    onChange={(e) =>
                      setAnnouncementMessage(
                        e.target.value
                      )
                    }
                    placeholder="Write your announcement here..."
                  />
                </label>

                <label>
                  Announcement Picture

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        e.target.files?.[0],
                        setAnnouncementImage
                      )
                    }
                  />
                </label>

                {announcementImage && (
                  <div>
                    <p>Picture preview:</p>

                    <img
                      src={announcementImage}
                      alt="Announcement preview"
                      className="announcement-preview"
                    />
                  </div>
                )}

                <button
                  className="primary"
                  onClick={addAnnouncement}
                >
                  Publish Announcement
                </button>
              </div>
            )}

            <div className="admin-records">

              {announcements.map(
                (announcement) => (
                  <div
                    className="record announcement-record"
                    key={announcement.id}
                  >

                    {announcement.image_url && (
                      <img
                        src={announcement.image_url}
                        alt={announcement.title}
                      />
                    )}

                    <div>
                      <strong>
                        {announcement.title}
                      </strong>

                      <p>
                        {announcement.announcement_date}
                        {' • '}
                        {announcement.announcement_type}
                      </p>

                      <p>
                        {announcement.message}
                      </p>
                    </div>

                  </div>
                )
              )}

            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
