import React, { Component } from "react";
import "./Clock.css"; // تأكد أنك دار هذا الملف فيها CSS لي نعطيه تحت

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  renderCircle(label, count, activeIndex, radius) {
    const items = [];
    for (let i = 1; i <= count; i++) {
      const angle = (360 / count) * i;
      const isActive = i === activeIndex;
      items.push(
        <div
          key={i}
          className={`item ${isActive ? "active" : ""}`}
          style={{
            transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
          }}
        >
          {i} {label}
        </div>
      );
    }

    return <div className="circle">{items}</div>;
  }

  render() {
    const { date } = this.state;
    const day = date.getDate();
    const month = date.toLocaleString("fr-FR", { month: "long" });
    const year = date.getFullYear();
    const week = Math.ceil(day / 7);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
      <div className="container">
        <h1>{year} / <span>Year</span></h1>
        <div className="clock">
  {this.renderCircle("month", 12, date.getMonth() + 1, 80)}
  {this.renderCircle("week", 5, week, 120)}
  {this.renderCircle("day", 31, day, 160)}
  {this.renderCircle("hr", 24, hour, 200)}
  {this.renderCircle("min", 60, minute, 240)}
  {this.renderCircle("sec", 60, second, 280)}
</div>
        <div className="center">
          <h2>
            {month} month - week {week} - {day} day - {hour} hr - {minute} min - {second} sec
          </h2>
        </div>
      </div>
    );
  }
}

export default Clock;
