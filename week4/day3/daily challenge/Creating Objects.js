
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }
  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

const video1 = new Video("JavaScript Basics", "Alice", 300);
video1.watch();

const video2 = new Video("OOP in JS", "Bob", 450);
video2.watch();

const videosData = [
  { title: "React Tutorial", uploader: "Charlie", time: 600 },
  { title: "Node.js Crash Course", uploader: "Dave", time: 720 },
  { title: "CSS Animations", uploader: "Eve", time: 400 },
  { title: "SQL Basics", uploader: "Frank", time: 500 },
  { title: "Python for Beginners", uploader: "Grace", time: 800 },
];

const videoInstances = videosData.map(v => new Video(v.title, v.uploader, v.time));
videoInstances.forEach(video => video.watch());
