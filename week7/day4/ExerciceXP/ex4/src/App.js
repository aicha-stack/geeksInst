// App.js
import React from "react";

function App() {
  const sendData = async () => {
    const url = "https://webhook.site/1ed45dbc-2dc7-4c03-9a89-9e672751baf0"; // Replace with your actual webhook URL
    const data = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.text(); 
      console.log("✅ Response from webhook:", result);
    } catch (error) {
      console.error("❌ Error sending data:", error);
    }
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Exercise 4 - Send JSON Data</h1>
      <button onClick={sendData}>🚀 Send JSON</button>
    </div>
  );
}

export default App;

