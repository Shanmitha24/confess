import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [confessions, setConfessions] = useState([]);

  const fetchConfessions = async () => {
    const res = await axios.get("http://localhost:5000/api/confess");
    setConfessions(res.data);
  };
const deletePost = async (id) => {
  await axios.delete(`http://localhost:5000/api/confess/delete/${id}`);
  fetchConfessions();
};


  useEffect(() => {
    fetchConfessions();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Panel</h2>

      {confessions.map((c) => (
        <div key={c._id} style={{ marginBottom: "10px" }}>
          <span>{c.text}</span>
          <button
            onClick={() => deletePost(c._id)}
            style={{ marginLeft: "10px" }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
