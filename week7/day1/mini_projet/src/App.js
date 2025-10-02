import React from "react";
import Header from "./components/header";
import CardSection from "./components/CardSection";
import Contact from "./components/contact";

function App() {
  const cards = [
    {
      icon: "fas fa-building",
      title: "About the Company",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      icon: "fas fa-globe",
      title: "Our Values",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      icon: "fas fa-university",
      title: "Our Mission",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ];

  return (
    <div>
      <Header />
      {cards.map((card, index) => (
        <CardSection key={index} {...card} />
      ))}
      <Contact />
    </div>
  );
}

export default App;
