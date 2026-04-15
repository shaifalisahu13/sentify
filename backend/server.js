const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// 🧠 Word lists
const positiveWords = [
  "happy", "good", "great", "awesome", "amazing",
  "love", "nice", "excellent", "fantastic", "wonderful"
];

const negativeWords = [
  "sad", "bad", "worst", "angry", "terrible",
  "hate", "poor", "awful", "disappointing", "horrible"
];

// analyze route
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  const lowerText = text.toLowerCase();
  let score = 0;

  // ⚠️ Handle "not" cases (basic)
  if (lowerText.includes("not good") || lowerText.includes("not happy")) {
    return res.json({ sentiment: "Negative", score: 80 });
  }

  // ✅ Count positive words
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) {
      score++;
    }
  });

  // ✅ Count negative words
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) {
      score--;
    }
  });

  // 🎯 Decide sentiment
  let sentiment = "Neutral";

  if (score > 0) sentiment = "Positive";
  else if (score < 0) sentiment = "Negative";

  // 📊 Convert score to percentage
  let finalScore = 50;

  if (sentiment === "Positive") {
    finalScore = 70 + score * 5;
  } else if (sentiment === "Negative") {
    finalScore = 30 + score * 5;
  }

  res.json({ sentiment, score: finalScore });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});