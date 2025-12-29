import { useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading backend...");

  // Test the backend connection
  const checkBackend = async () => {
    try {
      const res = await fetch("https://homestead-os.onrender.com/api/health");
      const data = await res.json();
      setMessage(data.status ?? "Backend connected");
    } catch (err) {
      setMessage("Backend not responding");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Homestead OS</h1>
      <p>{message}</p>
      <button onClick={checkBackend} style={styles.button}>
        Check Backend Status
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "40px"
  },
  button: {
    padding: "10px 16px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #222"
  }
};

export default App;
