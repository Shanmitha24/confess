import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
function UserApp() {
  const [text, setText] = useState("");
  const [confessions, setConfessions] = useState([]);

  const fetchConfessions = async () => {
    const res = await axios.get("http://localhost:5000/api/confess");
    setConfessions(res.data);
  };

  const submitConfession = async () => {
    if (!text) return;

    await axios.post("http://localhost:5000/api/confess", {
      text,
      mood: "neutral",
    });

    setText("");
    fetchConfessions();
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  return (
    <div  className="container">
      <h2>Anonymous Confession</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your confession..."
        style={{ width: "100%", height: "80px" }}
      />

      <button onClick={submitConfession} style={{ marginTop: "10px" }}>
        Post
      </button>

      <hr />

    {confessions
    .filter((c)=>!c.isHidden)
    .map((c) => (
  <div key={c._id} className="confession">
    <div>
      <p style={{ margin: 0 }}>{c.text}</p>
      <small>{c.anonymousName}</small>
    </div>

    <div>
      <button
        className="like"
        onClick={async () => {
          await axios.put(
            `http://localhost:5000/api/confess/${c._id}/like`
          );
          fetchConfessions();
        }}
      >
        ❤️ {c.likes}
      </button>

      <button
        className="report"
        onClick={async () => {
          await axios.put(
            `http://localhost:5000/api/confess/${c._id}/report`
          );
          fetchConfessions();
        }}
      >
        🚩 {c.reports}
      </button>
    </div>
  </div>
))}


    </div>
  );
}

export default UserApp;
