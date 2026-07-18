import Login from "./Login";
import Dashboard from "./Dashboard";
import { useState } from "react";
import Signup from "./Signup";

export default function App() {
  const [topic, setTopic] = useState("");
  const [tool, setTool] = useState("hashtags");
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [toast, setToast] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const showToast = (message) => {
  setToast(message);
  setTimeout(() => {
    setToast("");
  }, 2500);
};

  const generateContent = async () => {
    if (!topic) {
      showToast("⚠️ Please enter a topic");
      return;
    }

    setLoading(true);

    try {
      const endpoint = {
  hashtags: "generate-hashtags",
  caption: "generate-caption",
  poll: "generate-poll",
  ideas: "generate-ideas",
  improve: "improve-content"
}[tool];

const param = tool === "ideas" ? "niche" : "topic";

const response = await fetch(
  `http://127.0.0.1:8000/${endpoint}?${param}=${encodeURIComponent(topic)}&platform=${encodeURIComponent(platform)}&tone=${encodeURIComponent(tone)}`,
  {
    method: "POST",
  }
);

      const data = await response.json();

const generatedContent =
  data.hashtags ||
  data.caption ||
  data.poll ||
  data.ideas ||
  data.improved_content;

setResult(generatedContent);

setHistory((prev) => [generatedContent, ...prev]);
    } catch (error) {
      setResult("Error connecting to backend");
      console.log(error);
    }

    setLoading(false);
  };
  if (!isLoggedIn) {
  if (showSignup) {
    return <Signup onBack={() => setShowSignup(false)} />;
  }

  return (
    <Login
      onLogin={() => setIsLoggedIn(true)}
      onSignup={() => setShowSignup(true)}
    />
  );
}

  return (
  <div
    style={{
      padding: "40px",
      fontFamily: "Arial",
      background: darkMode ? "#111827" : "#F3F4F6",
      color: darkMode ? "white" : "black",
      minHeight: "100vh",
      transition: "0.3s",
    }}
  >
    {toast && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#10B981",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "bold",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      zIndex: 9999,
    }}
  >
    {toast}
  </div>
)}
    <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    float: "right",
    padding: "10px 15px",
    background: darkMode ? "#FBBF24" : "#111827",
    color: darkMode ? "black" : "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

<button
  onClick={() => setIsLoggedIn(false)}
  style={{
    float: "right",
    padding: "10px 15px",
    background: "#DC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  🚪 Logout
</button>
      <h1
  style={{
    color: darkMode ? "white" : "black",
  }}
>
  🚀 AI Social Media Manager
</h1>
      <p>
  {tool === "hashtags" && "Generate AI Hashtags"}
  {tool === "caption" && "Generate AI Captions"}
  {tool === "poll" && "Generate AI Polls"}
  {tool === "ideas" && "Generate AI Content Ideas"}
  {tool === "improve" && "Improve Your Content with AI"}
</p>

      <select
  value={tool}
  onChange={(e) => setTool(e.target.value)}
  style={{
    padding: "10px",
    width: "250px",
    marginBottom: "20px"
  }}
>
  <option value="hashtags">Hashtag Generator</option>
  <option value="caption">Caption Generator</option>
  <option value="poll">Poll Generator</option>
  <option value="ideas">Ideas Generator</option>
  <option value="improve">Content Improver</option>
</select>
<select
  value={platform}
  onChange={(e) => setPlatform(e.target.value)}
  style={{
    padding: "10px",
    width: "250px",
    marginLeft: "10px",
    marginBottom: "20px",
  }}
>
  <option value="LinkedIn">LinkedIn</option>
  <option value="Instagram">Instagram</option>
  <option value="Facebook">Facebook</option>
  <option value="X">X (Twitter)</option>
  <option value="YouTube">YouTube</option>
  <option value="Threads">Threads</option>
  <option value="Pinterest">Pinterest</option>
  <option value="Reddit">Reddit</option>
  <option value="TikTok">TikTok</option>
</select>
<select
  value={tone}
  onChange={(e) => setTone(e.target.value)}
  style={{
    padding: "10px",
    width: "250px",
    marginLeft: "10px",
    marginBottom: "20px",
  }}
>
  <option value="Professional">💼 Professional</option>
  <option value="Casual">😊 Casual</option>
  <option value="Funny">😂 Funny</option>
  <option value="Marketing">📢 Marketing</option>
  <option value="Creative">✨ Creative</option>
</select>

<br />
<br />

      {tool === "improve" ? (
  <textarea
    rows={6}
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    placeholder="Paste your content here..."
    style={{
      width: "500px",
      padding: "10px",
    }}
  />
) : (
  <input
    type="text"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    placeholder="Enter Topic"
    style={{
      width: "350px",
      padding: "10px",
    }}
  />
)}

      <br />
      <br />

      <button
        onClick={generateContent}
        style={{
          padding: "10px 20px",
          background: "#4F46E5",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <br />
      <br />
      {loading && (
  <p style={{ color: "#00ff99", fontWeight: "bold" }}>
    🤖 AI is generating content...
  </p>
)}

      <textarea
        value={result}
        readOnly
        rows={12}
        cols={60}
      />
      <div
  style={{
    marginTop: "8px",
    color: "#ccc",
    fontSize: "14px",
  }}
>
  Words: {result.trim() ? result.trim().split(/\s+/).length : 0} | Characters: {result.length}
</div>
{history.length > 0 && (
  <div style={{ marginTop: "20px" }}>
    <h3>📜 History</h3>

    {history.map((item, index) => (
      <div
        key={index}
        onClick={() => setResult(item)}
        style={{
          background: "#222",
          color: "white",
          padding: "10px",
          marginTop: "8px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {item.substring(0, 80)}...
      </div>
    ))}
  </div>
)}
      <button
  onClick={() => {
    navigator.clipboard.writeText(result);
    showToast("📋 Copied to Clipboard!");
  }}
  style={{
    marginTop: "10px",
    padding: "10px 20px",
    background: "#10B981",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  📋 Copy
</button>
<button
  onClick={() => {
    const blob = new Blob([result], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "content.txt";
    link.click();
  }}
  disabled={loading}
  style={{
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    opacity: loading ? 0.6 : 1,
  }}
>
  📥 Download
</button>
<button
  onClick={() => setResult("")}
  style={{
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#DC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  🗑️ Clear
</button>
<button
  onClick={() => {
    if (result.trim()) {
      setFavorites((prev) => [result, ...prev]);
      showToast("⭐ Added to Favorites!");
    }
  }}
  style={{
    marginLeft: "10px",
    padding: "10px 20px",
    background: "#F59E0B",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  ⭐ Favorite
</button>
{favorites.length > 0 && (
  <div
    style={{
      marginTop: "20px",
      padding: "15px",
      background: "#1e1e1e",
      borderRadius: "8px",
    }}
  >
    <h3>⭐ Favorites</h3>

    {favorites.map((item, index) => (
      <div
        key={index}
        onClick={() => setResult(item)}
        style={{
          background: "#333",
          color: "white",
          padding: "10px",
          marginTop: "8px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <button
  onClick={(e) => {
    e.stopPropagation();
    setFavorites(favorites.filter((_, i) => i !== index));
  }}
  style={{
    float: "right",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "4px 8px",
  }}
>
  ❌
</button>
        {item.substring(0, 80)}...
      </div>
    ))}
  </div>
)} 
    </div>
  );
}
