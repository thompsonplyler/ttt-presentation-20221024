import { useState, useEffect } from "react";
import "./App.css";
import Question from "./components/Question";
import io from "socket.io-client";

function App() {
  const [display, setDisplay] = useState(false);
  let socket;
  useEffect(() => {
    const socket = io("http://localhost:3131");
    socket.on("connected", () => {
      socket.on("question", () => {
        setDisplay(true);
      });
    });
  }, []);

  return (
    <div className="container">
      <div className="overlay2"></div>
      <div className="overlay1"></div>
      <Question />
    </div>
  );
}

export default App;
