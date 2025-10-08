import { useState } from "react";
import Flashcard from "./components/flashcard";
import "./index.css";

function App() {
  const initialCards = [
    { question: "Capital city of Nepal?", answer: "Kathmandu", frontColor: "rgba(255, 215, 0, 0.7)", backColor: "rgba(255, 140, 0, 0.7)" },
    { question: "Height of Mount Everest?", answer: "8,848.86 m", frontColor: "rgba(144, 238, 144, 0.7)", backColor: "rgba(34, 139, 34, 0.7)" },
    { question: "National bird of Nepal?", answer: "Himalayan Monal", frontColor: "rgba(135, 206, 250, 0.7)", backColor: "rgba(70, 130, 180, 0.7)" },
    { question: "National flower of Nepal?", answer: "Rhododendron", frontColor: "rgba(255, 182, 193, 0.7)", backColor: "rgba(255, 105, 180, 0.7)" },
    { question: "Living Goddess of Nepal?", answer: "Kumari", frontColor: "rgba(255, 182, 193, 0.7)", backColor: "rgba(255, 105, 180, 0.7)" },
    { question: "Which Nepalese fruit is considered the national fruit and only grows in certain regions?", answer: "Lapsi (Choerospondias axillaris)", frontColor: "rgba(255, 223, 186, 0.7)", backColor: "rgba(255, 140, 0, 0.7)" },
    { question: "How many UNESCO World Heritage Sites are in Nepal?", answer: "10", frontColor: "rgba(255, 224, 178, 0.7)", backColor: "rgba(255, 183, 77, 0.7)" },
    { question: "Great spiritual leader born in Nepal?", answer: "Gautam Buddha", frontColor: "rgba(255, 235, 205, 0.7)", backColor: "rgba(255, 193, 7, 0.7)" },
    { question: "Highest lake in the world located in Nepal?", answer: "Tilicho Lake", frontColor: "rgba(240, 230, 140, 0.7)", backColor: "rgba(189, 183, 107, 0.7)" },
    { question: "How many peaks over 8,000 m are in Nepal?", answer: "8 peaks", frontColor: "rgba(152, 251, 152, 0.7)", backColor: "rgba(60, 179, 113, 0.7)" },
  ];

  const [cards, setCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [flipKey, setFlipKey] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState(null);

  // 🔥 Extra feature states
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
  const [shuffled, setShuffled] = useState(false);

  const normalize = (text) => {
    return text.replace(/[.,!?;:'"()\-\s]/g, "").toLowerCase();
  };

  const handleNext = () => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
    } else if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    resetState();
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    else setCurrentIndex(-1);
    resetState();
  };

  const resetState = () => {
    setFlipKey((prev) => prev + 1);
    setUserGuess("");
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (currentIndex === -1) return;
    const correctAnswer = normalize(cards[currentIndex].answer);
    const userAnswer = normalize(userGuess);

    if (userAnswer === correctAnswer) {
      setFeedback("✅ Correct!");
      setCurrentStreak((s) => {
        const newStreak = s + 1;
        if (newStreak > longestStreak) setLongestStreak(newStreak);
        return newStreak;
      });
    } else {
      setFeedback("❌ Wrong! Try again.");
      setCurrentStreak(0);
    }
  };

  const handleMastered = () => {
    if (currentIndex >= 0 && !masteredCards.includes(currentIndex)) {
      setMasteredCards([...masteredCards, currentIndex]);
      handleNext();
    }
  };

  const handleShuffle = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5); // ✅ copy first
    setCards(shuffledCards);
    setShuffled(true);
    setCurrentIndex(-1);
    resetState();
  };

  const cardContent =
    currentIndex === -1
      ? {
          question: "START",
          answer: "🎉 Let's see how much you know about Nepal! 🎉",
          frontColor: "rgba(195, 220, 240, 0.29)",
          backColor: "rgba(239, 244, 244, 0.2)",
        }
      : cards[currentIndex];

  return (
    <div className="app-container">
      <video autoPlay loop muted className="background-video">
        <source src="/1001.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <h1 className="title">Nepal Flashcards 🇳🇵</h1>
        <p className="description">Type your answer & check</p>
        <p className="count">
          {currentIndex === -1
            ? `Total Cards: ${cards.length}`
            : `Card ${currentIndex + 1} of ${cards.length}`}
        </p>

        <Flashcard
          key={flipKey}
          question={cardContent.question}
          answer={cardContent.answer}
          frontColor={cardContent.frontColor}
          backColor={cardContent.backColor}
        />

        {currentIndex >= 0 && (
          <div className="guess-section">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Enter your guess..."
              className={`guess-input ${
                feedback === "✅ Correct!"
                  ? "input-correct"
                  : feedback === "❌ Wrong! Try again."
                  ? "input-wrong"
                  : ""
              }`}
            />
            <button onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
            {feedback && <p className="feedback">{feedback}</p>}
          </div>
        )}

        <div className="button-container">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={currentIndex <= -1}
          >
            ⬅ Prev
          </button>
          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
          >
            {currentIndex === -1 ? "START" : "Next ➡"}
          </button>
        </div>

        {/* 🔥 Extra feature buttons & stats */}
        <div className="extra-controls">
          <button onClick={handleShuffle} className="nav-btn">
            🔀 Shuffle
          </button>
          {currentIndex >= 0 && (
            <button onClick={handleMastered} className="nav-btn">
              ✅ Mastered
            </button>
          )}
        </div>

        <div className="stats">
          <p>🔥 Current Streak: {currentStreak}</p>
          <p>🏆 Longest Streak: {longestStreak}</p>
          <p>📚 Mastered: {masteredCards.length}</p>
          {shuffled && <p>🔀 Deck shuffled!</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
