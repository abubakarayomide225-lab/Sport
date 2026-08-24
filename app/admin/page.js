'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    if (email === 'abubakarfc001@gmail.com' && password === 'Abubakar#1') {
      setLoggedIn(true);
    } else {
      alert('Incorrect email or password');
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
            placeholder="admin@abubakarfc.com"
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

        <div className="admin-grid">
          <div>
            <h2>Fixtures</h2>
            <p>Add and manage upcoming matches.</p>
            <button>Add Fixture</button>
          </div>

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
        </div>
      </div>
    </main>
  );
}
