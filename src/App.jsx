import React, { useState, useEffect } from 'react';
import succinctLogo from './assets/succinct-logo.png'; // Replace with actual path

// Easy emoji sagas
const easySagas = [
  { emojis: ['🔐', '💻'], answer: 'secure code', hint: 'Locked software' },
  { emojis: ['🧠', '⚡'], answer: 'smart proof', hint: 'Quick thinking for ZK' },
  { emojis: ['🔒', '🌐'], answer: 'private web', hint: 'Safe browsing' },
  { emojis: ['🚀', '🛠️'], answer: 'fast build', hint: 'Speedy development' },
  { emojis: ['🕵️', '📜'], answer: 'zk secret', hint: 'Hidden knowledge' },
  { emojis: ['⛓️', '✅'], answer: 'chain verify', hint: 'Blockchain truth' },
  { emojis: ['💾', '🔐'], answer: 'data lock', hint: 'Protected info' },
  { emojis: ['🤖', '⚙️'], answer: 'auto proof', hint: 'Machine validation' },
  { emojis: ['🌍', '🛡️'], answer: 'global shield', hint: 'Worldwide safety' },
  { emojis: ['📉', '💸'], answer: 'low cost', hint: 'Cheaper transactions' },
  { emojis: ['🔍', '🔒'], answer: 'private check', hint: 'Secret verification' },
  { emojis: ['🚀', '🧩'], answer: 'quick puzzle', hint: 'Fast problem-solving' },
  { emojis: ['🖥️', '🔐'], answer: 'secure system', hint: 'Safe tech' },
  { emojis: ['💡', '🔒'], answer: 'bright idea', hint: 'Smart privacy' },
  { emojis: ['📦', '✅'], answer: 'proof package', hint: 'Verified bundle' },
  { emojis: ['🛠️', '⚡'], answer: 'fast tool', hint: 'Quick tech fix' },
  { emojis: ['🤝', '🔐'], answer: 'trust deal', hint: 'Secure agreement' },
  { emojis: ['📜', '🛡️'], answer: 'safe record', hint: 'Protected document' },
  { emojis: ['🌐', '⚡'], answer: 'fast network', hint: 'Speedy connections' },
  { emojis: ['🧠', '✅'], answer: 'zk truth', hint: 'Smart verification' }
];

// Hard emoji sagas
const hardSagas = [
  { emojis: ['🔄', '🔗'], answer: 'zk rollup', hint: 'Scalable proof layer' },
  { emojis: ['🌐', '🤖'], answer: 'prover network', hint: 'Global proof system' },
  { emojis: ['⚙️', '🚗'], answer: 'sp1 engine', hint: 'Powering fast ZK' },
  { emojis: ['📦', '🔗'], answer: 'blockchain', hint: 'Chain data bundle' },
  { emojis: ['🧙‍♂️', '🎉'], answer: 'zk community', hint: 'Magic of collaboration' },
  { emojis: ['🔗', '🔐'], answer: 'secure link', hint: 'Safe chain connection' },
  { emojis: ['💻', '📉'], answer: 'cost-efficient', hint: 'Cheaper computing' },
  { emojis: ['🛡️', '⚡'], answer: 'safe speed', hint: 'Secure and fast' },
  { emojis: ['🪙', '✅'], answer: 'proof token', hint: 'Proof verification' },
  { emojis: ['🔁', '🧠'], answer: 'zk cycle', hint: 'Proof loop' },
  { emojis: ['🌍', '📦'], answer: 'global bundle', hint: 'Worldwide data pack' },
  { emojis: ['⚙️', '🖱️'], answer: 'zk machine', hint: 'Proof processor' },
  { emojis: ['🚗', '🔍'], answer: 'fast verify', hint: 'Quick truth check' },
  { emojis: ['🧩', '🔐'], answer: 'puzzle-proof', hint: 'Secure solution' },
  { emojis: ['📜', '⚡'], answer: 'quick proof', hint: 'Fast validation' },
  { emojis: ['🤖', '🛠️'], answer: 'sp1 builder', hint: 'Tech for ZK' },
  { emojis: ['🔒', '💖'], answer: 'private proof', hint: 'Secure proof' },
  { emojis: ['🔗', '✅'], answer: 'network trust', hint: 'Global verification' },
  { emojis: ['💡', '🔗'], answer: 'zk chain', hint: 'Smart blockchain' },
  { emojis: ['🎉', '🔗'], answer: 'community chain', hint: 'Connected fun' }
];

// Normalize strings for emoji
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Feedback message templates
const correctFeedbackMessages = [
  `AHHHHHHHHHHHHHHH! %s, that's a Succinct Summer proof! You cracked "%s" like a ZK wizard! 🔥`,
  `Brotha man! 💀 %s, you dropped a BANGER! "%s" bows to your SP1 skills! 🚀`,
  `Yinger's hyped, %s! BANGER guess for "%s"! Succinct Summer's ZK vibes are strong with you! 🌟`,
  `👀👀 %s, that's a ZK BANGER! You nailed "%s" like Addy's fast Prover Network! 🔗`,
  `BANG-BANG, %s! Hottest BANGER! "%s" proves you're a ZK genius! ✨`,
  `AHHHHHHHHHHHHHHH! %s, you smashed "%s"! Yinger's calling it a BANGER! 💪`,
  `Mega Banger, %s! 🔥 "%s" got owned! 🎉`,
  `%s, you're a ZK rockstar! 🌟 "%s" unlocked! Brotha man 💀`,
  `👀👀 BANGER city, %s! "%s" fell to your ZK prowess this Succinct Summer! 🎊`,
  `Yinger's losing it, %s! That's a BANGER for "%s"! Addy's like, Brotha man 💀! 🥳`
];

const incorrectFeedbackMessages = [
  `AHHHHHHHHHHHHHHH, %s! That guess was wilder than a Succinct Summer hackathon gone wrong! Try again! 👀👀 😂`,
  `Brotha man 💀, %s, your guess got lost in the ZK fog! Needs more juice for that one! 😜`,
  `👀👀 %s, that's a ZK blooper! Your guess crashed like a buggy SP1 build! 🤣`,
  `Oof, %s, that guess is more off than Addy's AHHHHHHHHHHHHHHH at a quiet meetup! Succinct Summer retry! 😅`,
  `Nah, %s, that's not the ZK vibe! Your guess needs a reboot—Brotha man 💀, swing again! 😆`,
  `%s, your guess is so wrong, it's like a ZK proof with no verifier! 👀👀 😂`,
  `Whoops, %s, that guess flopped harder than a failed Prover Network node! Try again! 😝`,
  `AHHHHHHHHHHHHHHH, %s! That guess is a ZK prank gone too far! Brotha man 💀, guess better! 😛`,
  `👀👀 %s, that was a ZK fumble! Even Addy's shaking his head! Retry, champ! 🤪`,
  `%s, that guess missed the ZK mark! Addy's like, AHHHHHHHHHHHHHHH, try some ZK magic! 😹`
];

function App() {
  const [username, setUsername] = useState('');
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [difficulty, setDifficulty] = useState('easy');
  const [currentSaga, setCurrentSaga] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setIsUsernameSubmitted(true);
    } else {
      setFeedback('Please enter a username!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUsernameSubmit();
    }
  };

  const generateSaga = () => {
    const pool = difficulty === 'easy' ? easySagas : hardSagas;
    const saga = pool[Math.floor(Math.random() * pool.length)];
    setCurrentSaga(saga);
    setFeedback('');
    setShowHint(false); // Reset hint visibility
    setGuess('');
  };

  const checkGuess = () => {
    if (!currentSaga) return;

    const userWords = normalize(guess).split('');
    const answerWords = normalize(currentSaga.answer).split('');
    const matchCount = userWords.filter(letter => answerWords.includes(letter)).length;

    const percentMatch = matchCount / answerWords.length;

    const randomIndex = Math.floor(Math.random() * correctFeedbackMessages.length);
    if (normalize(guess) === normalize(currentSaga.answer) || percentMatch > 0.6) {
      setFeedback(
        correctFeedbackMessages[randomIndex]
          .replace('%s', username)
          .replace('%s', currentSaga.answer)
      );
      setShowHint(false);
    } else {
      setFeedback(
        incorrectFeedbackMessages[randomIndex]
          .replace('%s', username)
          .replace('%s', currentSaga.answer)
      );
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div>
      <div className="header">
        <img src={succinctLogo} alt="Succinct Logo" className="logo" />
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div className="welcome-emoji">🤖🎉</div>
      <div className="title">Succinct Emoji Saga</div>

      <div className="card">
        {!isUsernameSubmitted ? (
          <div className="username-container">
            <label className="username-label">Username:</label>
            <input
              type="text"
              placeholder="@username or username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="username-input"
            />
            <button onClick={handleUsernameSubmit} className="enter-button">
              Enter
            </button>
          </div>
        ) : (
          <>
            <div className="username-display">Playing as: @{username}</div>
            <div className="difficulty-buttons" style={{ margin: '1rem 0' }}>
              <button
                onClick={() => setDifficulty('easy')}
                className={difficulty === 'easy' ? 'active' : ''}
              >
                Easy
              </button>{' '}
              <button
                onClick={() => setDifficulty('hard')}
                className={difficulty === 'hard' ? 'active' : ''}
              >
                Hard
              </button>
            </div>

            <button onClick={generateSaga}>Generate Emoji Saga</button>

            {currentSaga && (
              <>
                <div className="emoji-saga">
                  @{username} → {currentSaga.emojis.join(' ')}
                </div>

                <button onClick={toggleHint} className="hint-button">
                  ❓
                </button>
                {showHint && <div className="hint-text">Hint: {currentSaga.hint}</div>}

                <input
                  type="text"
                  placeholder="What does it mean?"
                  value={guess}
                  onChange={e => setGuess(e.target.value)}
                />

                <div className="action-buttons">
                  <button onClick={checkGuess}>Submit Guess</button>
                  <button onClick={generateSaga} className="retry-button">
                    Try another saga
                  </button>
                </div>

                <div className="feedback">{feedback}</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;