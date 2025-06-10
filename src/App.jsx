import React, { useState, useEffect } from 'react';
import succinctLogo from './assets/succinct-logo.png'; // Replace with actual path

const easySagas = [
  { emojis: ['🔒', '🧠', '🙈', '🔍'], answer: 'Zero Knowledge', hint: 'Secret computation' },
  { emojis: ['✅', '🔐', '📜', '✔️'], answer: 'ZK Proofs', hint: 'Locked validation' },
  { emojis: ['🌐', '🤝', '🔗', '👥'], answer: 'Prover Network', hint: 'Worldwide proof team' },
  { emojis: ['🪙', '📜', '💰', '✅'], answer: 'Prove Token', hint: 'Proof reward coin' },
  { emojis: ['🛡️', '🙈', '🔒', '🕵️'], answer: 'Privacy Protection', hint: 'Guarded secrets' },
  { emojis: ['📝', '✅', '🔍', '✔️'], answer: 'Proof Verification', hint: 'Truth checking' },
  { emojis: ['🌍', '💾', '📂', '🤲'], answer: 'Open Source', hint: 'Shared software' },
  { emojis: ['⛓️', '🔗', '🌐', '⚙️'], answer: 'Ethereum Integration', hint: 'Blockchain link' },
  { emojis: ['🔐', '🛡️', '🔒', '🔑'], answer: 'Cryptographic Security', hint: 'Safe codes' },
  { emojis: ['⚡', '📈', '🚀', '⏩'], answer: 'Performance Optimization', hint: 'Speed enhancement' },
  { emojis: ['🤝', '✅', '👥', '✔️'], answer: 'Consensus Mechanism', hint: 'Group agreement' },
  { emojis: ['👥', '🎉', '🌟', '💬'], answer: 'Community Engagement', hint: 'Team excitement' },
  { emojis: ['🌟', '🎁', '🏆', '💎'], answer: 'Star Rewards', hint: 'Testnet awards' },
  { emojis: ['💸', '⚡', '💰', '⏩'], answer: 'Transaction Efficiency', hint: 'Fast payments' },
  { emojis: ['📜', '🤖', '⚙️', '✅'], answer: 'Smart Contracts', hint: 'Auto deals' },
  { emojis: ['📉', '💵', '💸', '⬇️'], answer: 'Cost Reduction', hint: 'Lower expenses' },
  { emojis: ['💡', '🚀', '🌟', '🔥'], answer: 'Innovation Driven', hint: 'New tech' },
  { emojis: ['🤝', '💻', '👥', '⚙️'], answer: 'Collaborative Development', hint: 'Team coding' },
  { emojis: ['🌱', '📈', '🌍', '⬆️'], answer: 'Ecosystem Growth', hint: 'Network expansion' },
  { emojis: ['👨‍💻', '🔓', '💻', '✅'], answer: 'Developer Accessibility', hint: 'Simple coding' },
];

const hardSagas = [
  { emojis: ['⚙️', '📍', '🔐', '🧊'], answer: 'SP1 Hypercube', hint: 'ZK tech cube' },
  { emojis: ['💻', '🔒', '⚙️', '🙈'], answer: 'ZK Virtual', hint: 'Secret computer' },
  { emojis: ['🔄', '⛓️', '📦', '✅'], answer: 'ZK Rollup', hint: 'Proof batching' },
  { emojis: ['🌐', '🔍', '🤝', '✅'], answer: 'Decentralized Proving', hint: 'Shared proof work' },
  { emojis: ['🌟', '📜', '🔐', '📏'], answer: 'STARK Proofs', hint: 'Big ZK proof' },
  { emojis: ['🔍', '📜', '🔐', '📉'], answer: 'SNARK Proofs', hint: 'Small ZK proof' },
  { emojis: ['⚙️', '🧩', '🔧', '✅'], answer: 'Precompile Support', hint: 'Fast code parts' },
  { emojis: ['🖥️', '✅', '⛓️', '🔍'], answer: 'BitVM Verification', hint: 'Bitcoin truth check' },
  { emojis: ['🔗', '🌍', '⛓️', '🌐'], answer: 'Interoperability Solutions', hint: 'Chain connections' },
  { emojis: ['🦀', '💻', '⚙️', '📝'], answer: 'Rust Programming', hint: 'Tech coding' },
  { emojis: ['📜', '⚡', '✅', '🔍'], answer: 'Proof Generation', hint: 'Quick proof making' },
  { emojis: ['🧪', '🌐', '🔍', '👥'], answer: 'Testnet Participation', hint: 'Network trials' },
  { emojis: ['🏗️', '🔍', '⚙️', '📜'], answer: 'Proving Infrastructure', hint: 'Proof system' },
  { emojis: ['⛓️', '✅', '🔍', '🌐'], answer: 'Onchain Verification', hint: 'Chain truth' },
  { emojis: ['🌐', '🖥️', '⚙️', '📤'], answer: 'Offchain Computation', hint: 'Outside processing' },
  { emojis: ['⛽', '📉', '💸', '⬇️'], answer: 'Gas Optimization', hint: 'Chain cost cut' },
  { emojis: ['🛡️', '🔍', '✅', '🔐'], answer: 'Security Audits', hint: 'Safety review' },
  { emojis: ['📝', '✅', '🔍', '🧮'], answer: 'Formal Verification', hint: 'Math proof' },
  { emojis: ['🌐', '🛒', '📜', '💸'], answer: 'Network Marketplace', hint: 'Proof trading hub' },
  { emojis: ['⛓️', '🚀', '⚡', '📈'], answer: 'Blockchain Scalability', hint: 'Fast chain growth' },
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
