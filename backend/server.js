const express = require("express");
const cors = require("cors");
const http = require("http");
const fs = require("fs");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let sensorData = {
  temperature: 25,  // مقدار پیش‌فرض
  heater: 0,        // 0 = خاموش، 1 = روشن
  light: 0,         // 0 = خاموش، 1 = روشن
  buzzer: 0,         // 0 = خاموش، 1 = روشن
  
};




// API دریافت داده‌های سنسور
app.get("/status", (req, res) => {
  res.json(sensorData);
});

//  API کنترل سخت‌افزار (روشن/خاموش
app.post("/control", (req, res) => {
  const { light, buzzer, heater,temperature } = req.body;
  if (light !== undefined) sensorData.light = light ? 1 : 0;
  if (buzzer !== undefined) sensorData.buzzer = buzzer ? 1 : 0;
  if (heater !== undefined) sensorData.heater = heater ? 1 : 0;
  if (temperature !== undefined) sensorData.temperature =temperature;

  io.emit("sensorUpdate", sensorData);
  res.json({ success: true, message: "Device state updated!", buzzer });
});

//  راه‌اندازی سرور
const PORT = 5050;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
