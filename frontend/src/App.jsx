import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(null);

  // word lists (same as backend)
  const positiveWords = ["happy","good","great","awesome","amazing","love"];
  const negativeWords = ["sad","bad","worst","angry","terrible","hate"];

  // function to call backend
  const analyzeText = async () => {
    if (!text.trim()) {
      setResult("Please enter some text ⚠️");
      return;
    }

    try {
      const res = await axios.post("https://sentify-backend-u503.onrender.com/analyze", {
        text,
      });

      setResult(res.data.sentiment);
      setScore(res.data.score);
    } catch (error) {
      console.error(error);
      setResult("Error occurred");
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>

      {/* 🔝 Navbar */}
      <div className="navbar">
        <h2>Sentify</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      {/* 📦 Main Content */}
      <div className="container">
        <div className="card">

          <h1>Decode the Mood</h1>
          <p>Uncover emotions hidden in your text</p>

          {/* ✍️ Input */}
          <div className="input-group">
            <textarea
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  analyzeText();
                }
              }}
            />
            <p className="counter">{text.length} characters</p>
          </div>

          <button onClick={analyzeText}>
            Analyze Sentiment 🚀
          </button>

          {/* 🎯 Result */}
          <div className="result">
            {result && (
              <span
                className={
                  result === "Positive"
                    ? "badge positive"
                    : result === "Negative"
                    ? "badge negative"
                    : "badge neutral"
                }
              >
                {result === "Positive" && `😊 Positive (${score}%)`}
                {result === "Negative" && `😡 Negative (${score}%)`}
                {result === "Neutral" && `😐 Neutral (${score}%)`}
                {result === "Please enter some text ⚠️" && result}
              </span>
            )}
          </div>

          {/* 🎨 Highlighted Text (NEW FEATURE) */}
          <div className="highlighted-text">
  {text.split(" ").map((word, index) => {
    let className = "";
    let tooltip = "";

    if (positiveWords.includes(word.toLowerCase())) {
      className = "positive-word";
      tooltip = "This word expresses a positive emotion";
    } else if (negativeWords.includes(word.toLowerCase())) {
      className = "negative-word";
      tooltip = "This word expresses a negative emotion";
    }

    return (
      <span
        key={index}
        className={className}
        title={tooltip}
      >
        {word}{" "}
      </span>
    );
  })}
</div>

        </div>
      </div>

    </div>
  );
}

export default App;