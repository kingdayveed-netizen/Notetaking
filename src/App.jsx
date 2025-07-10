import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setNotes(savedNotes);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const saveNote = () => {
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and body.');
      return;
    }

    const newNote = { title, body };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setTitle('');
    setBody('');
  };

  const clearFields = () => {
    setTitle('');
    setBody('');
  };

  const loadNote = (note) => {
    setTitle(note.title);
    setBody(note.body);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={'app-container ${...theme}'}> 
      <header className="header">
        {/* <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div> */}
        <h1>Note Taking App</h1>
      </header>

      {/* {menuOpen && (
        <nav className="sidebar">
          <button onClick={toggleTheme}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        </nav>
      )} */}

      <div className="app">
        <div className="note-form">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Body:</label>
          <textarea
            placeholder="Write your note here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="buttons">
            <button onClick={clearFields}>Clear</button>
            <button onClick={saveNote}>Save</button>
          </div>
        </div>

        <div className="note-history">
          <h2>Note History</h2>
          {notes.length === 0 ? (
            <p>No notes saved.</p>
          ) : (
            notes.map((note, idx) => (
              <button key={idx} className="note-button" onClick={() => loadNote(note)}>
                {note.title}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;