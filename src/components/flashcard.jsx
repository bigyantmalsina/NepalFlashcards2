import { useState, useEffect } from "react";
import "../index.css";

function Flashcard({ question, answer, frontColor, backColor }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
        <div
          className="flashcard-front"
          style={{ backgroundColor: frontColor }}
        >
          <p>{question}</p>
        </div>
        <div
          className="flashcard-back"
          style={{ backgroundColor: backColor }}
        >
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
