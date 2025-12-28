import React, { useEffect, useState } from "react";
import "./App.css";

interface Activity {
  name: string;
  category: string;
  timeOfDay: string;
  priority: number;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://homestead-os.onrender.com";

  const fetchActivities = async () => {
    try {
      const res = await fetch(`${API_URL}/activities`);
      if (!res.ok) throw new Error("Failed to fetch activities");
      const data = await res.json();
      setActivities(data.activities);
    } catch (err) {
      setError("Unable to load activities from backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="App">
      <h1>Homestead OS Planner</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && activities.length === 0 && <p>No activities found</p>}

      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <strong>{activity.name}</strong> — {activity.category}  
            <span> ({activity.timeOfDay})</span>
            <span> — Priority: {activity.priority}</span>
          </li>
        ))}
      </ul>

      <button onClick={fetchActivities}>Refresh</button>
    </div>
  );
}

export default App;
