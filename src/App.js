import { useState } from "react";
import Admin from "./Admin";
import UserApp from "./UserApp";

function App() {
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const checkAdmin = () => {
    if (password === "admin123") {
      setAdmin(true);
    } else {
      alert("Wrong password");
    }
  };

  return (
    <>
      {!admin ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={checkAdmin}>Enter Admin</button>

          <hr />
          <UserApp />
        </div>
      ) : (
        <Admin />
      )}
    </>
  );
}

export default App;
