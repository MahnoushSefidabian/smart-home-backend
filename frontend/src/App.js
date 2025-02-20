import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css"; // استایل‌های CSS
import "@fortawesome/fontawesome-free/css/all.min.css";

const socket = io("http://localhost:5050"); // اتصال به سرور

const App = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    irSensor: 0,
    lightSensor: 0,
    heater: 0,
    buzzer: 0,
    light: 0,
  });

  useEffect(() => {
    socket.on("sensorUpdate", (data) => {
      setSensorData(data);
    });

    return () => {
      socket.off("sensorUpdate");
    };
  }, []);

  const handleControl = async (device) => {
    const updatedState = { [device]: 0 }; // مقدار را به 0 تغییر دادیم
    await fetch("http://localhost:5050/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedState),
    });
  };

  return (
    <div className="app">
      <h1 className="title">🏠 سیستم خانه هوشمند</h1>

      <div className="cards-container">
        {/* دما */}
        <div className="card">
          <h2 className="card-title">🌡️ دما</h2>
          
          <p className="card-value">{sensorData.temperature.toFixed(2)}°C</p>
          <p className={`status ${sensorData.heater === 1 ? "on" : "off"}`}>
            {sensorData.heater === 1 ? "🔥 هیتر روشن است" : "❄️ هیتر خاموش است"}
          </p>
        </div>

        {/* شدت نور */}
        <div className="card">
          <h2 className="card-title">🌞 شدت نور</h2>
      
          <div className="card-content"></div>
  
          <p className={`status ${sensorData.light === 1 ? "on" : "off"}`}>
            {sensorData.light === 1 ? "💡 چراغ روشن است" : "🌙 چراغ خاموش است"}
          </p>
          
        </div>

        {/* آژیر*/}
        <div className="card">
          <h2 className="card-title">👀 دزدگیر</h2>
          <p className={`card-value ${sensorData.irSensor === 1 ? "alert" : "normal"}`}>
            
          </p>
          {sensorData.buzzer === 1 && (
            <button onClick={() => handleControl("buzzer")} className="control-button">
              خاموش کردن دزدگیر 🔊
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
