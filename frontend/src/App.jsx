import { useState } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [tool, setTool] = useState("hashtags");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!topic) {
      alert("Please enter a topic");
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
  `http://127.0.0.1:8000/${endpoint}?${param}=${encodeURIComponent(topic)}&platform=LinkedIn`,
  {
    method: "POST",
  }
);

      const data = await response.json();
      setResult(
  data.hashtags ||
  data.caption ||
  data.poll ||
  data.ideas ||
  data.improved_content
);
    } catch (error) {
      setResult("Error connecting to backend");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚀 AI Social Media Manager</h1>
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
)}n

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
      <button
  onClick={() => {
    navigator.clipboard.writeText(result);
    alert("Copied!");
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
    </div>
  );
}
