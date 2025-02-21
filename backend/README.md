
# **Smart Home Backend**  

This project is a **Node.js-based backend** for a **smart home automation system**. It provides **RESTful APIs** and **WebSocket** support to control and monitor home devices such as lights, heaters, buzzers, and temperature sensors.  

##  **Features**  

 **REST API** to fetch and update device states  
 **WebSocket (`Socket.io`)** for real-time updates  
 **CORS enabled** for cross-domain access  
 **Lightweight and fast**, built with `Express.js`  
 **Easily extendable** for additional IoT devices  

---

##  **Technologies Used**  

- **Node.js** – Server runtime  
- **Express.js** – API handling  
- **Socket.io** – Real-time communication  
- **CORS** – Cross-Origin Resource Sharing  
- **HTTP Server** – To serve APIs  

---

##  **Project Structure**  

```
smart-home-backend/
│── server.js          # Main server file
│── package.json       # Project dependencies
│── README.md          # Documentation (this file)
```

---

##  **Installation & Setup**  

 **Clone the repository:**  
```bash
git clone https://github.com/YourUsername/smart-home-backend.git
cd smart-home-backend
```

 **Install dependencies:**  
```bash
npm install
```

 **Run the server:**  
```bash
node server.js
```
_Server will run on **port 5050**._

---

##  **API Endpoints**  

###  **Get Sensor Status**  
**Endpoint:** `/status`  
**Method:** `GET`  
 Returns the current status of smart home devices.  

 **Example Response:**  
```json
{
  "temperature": 25,
  "heater": 0,
  "light": 0,
  "buzzer": 0
}
```

---

###  **Control Devices**  
**Endpoint:** `/control`  
**Method:** `POST`  
 Allows users to turn devices on/off and update temperature settings.  

 **Example Request:**  
```json
{
  "light": 1,
  "buzzer": 0,
  "heater": 1,
  "temperature": 22
}
```

 **Example Response:**  
```json
{
  "success": true,
  "message": "Device state updated!"
}
```

---

##  **Real-Time WebSocket Communication**  

 The server uses **Socket.io** to send live updates whenever device states change.  

 **Event Name:** `sensorUpdate`  
 **Data Sent:**  
```json
{
  "temperature": 22,
  "heater": 1,
  "light": 1,
  "buzzer": 0
}
```

Clients listening to `sensorUpdate` will receive **instant updates** whenever a device status changes.

---

##  **How to Test APIs?**  

### ** Using Postman**  
- **GET** request to `http://localhost:5050/status`  
- **POST** request to `http://localhost:5050/control` with JSON data  

### ** Using Curl**  
 **Get device status:**  
```bash
curl -X GET http://localhost:5050/status
```

 **Control devices:**  
```bash
curl -X POST http://localhost:5050/control -H "Content-Type: application/json" -d '{"light": 1, "buzzer": 0, "heater": 1, "temperature": 22}'
```

---

