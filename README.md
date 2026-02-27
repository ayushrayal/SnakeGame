# 🐍 Snake Game (Vanilla JavaScript)

A fully functional Snake Game built using **HTML, CSS, and Vanilla JavaScript**.

This project focuses on clean game logic, structured state management, collision detection, DOM rendering, sound integration, and responsive controls — all without using any external libraries or frameworks.

---

## 🚀 Features

- 🎮 Arrow Keys + WASD controls   
- 🔊 Random sound effects (start, eat, game over)  
- 🧠 Self-collision detection  
- 🧱 Wall collision detection  
- 🍎 Safe random food generation (never spawns on snake body)  
- 📈 Live score tracking  
- 🏆 High score saved using LocalStorage  
- ⏱ Real-time game timer  
- 🔁 Clean restart system  
- 🧼 Proper board cleanup (no ghost snake issue)  
- 🖼 Custom snake head using `.head` class  

---

## 🛠 Tech Stack

- HTML5  
- CSS3  
- JavaScript (ES6)  
- LocalStorage API  
- DOM Manipulation  

No frameworks. No libraries. Pure logic.

---

## 🎮 Controls

### Desktop

- ⬆ Arrow Up / W → Move Up  
- ⬇ Arrow Down / S → Move Down  
- ⬅ Arrow Left / A → Move Left  
- ➡ Arrow Right / D → Move Right  

Reverse direction is prevented to avoid instant self-collision.

---

## 🧠 Game Logic Overview

Each game update follows this pipeline:

1. Calculate next head position  
2. Check wall collision  
3. Check self collision  
4. Clear previous board state  
5. Add new head (`unshift`)  
6. Check if food is eaten  
7. If eaten → grow  
8. If not eaten → remove tail (`pop`)  
9. Render updated snake and food  

This keeps the game predictable, clean, and easy to debug.

---

## 📂 Project Structure
snake-game/
│
├── index.html
├── style.css
├── script.js
│
└──sounds/
  ├── gameEatSound/
  ├── gameOverSound/
  └── gameStartSound/


---

## 🏆 High Score System

High score is stored using the browser's LocalStorage:

- Persists even after page refresh
- Automatically updates when a new high score is reached

---

## 🧼 Bugs Fixed During Development

- Duplicate `unshift()` movement bug  
- Old snake remaining after game over  
- Multiple intervals running on restart  
- Food not clearing visually  
- Reverse direction instant death  
- Food spawning on snake body  

---

## 📈 What This Project Demonstrates

- Game loop logic  
- Collision detection  
- Clean DOM update patterns  
- State management without frameworks  
- Debugging rendering bugs  
- Sound handling in the browser  
- LocalStorage usage  

---

## 🏁 How To Run

1. Clone the repository  
2. Open the project folder  
3. Run using Live Server (recommended)  
4. Click **Start** and play  

---

## 🔮 Future Improvements

- Canvas-based version for smoother performance  
- Pause feature  
- Difficulty selector  
- Power-ups  
- Animated head rotation  
- Particle effects  
- Theme switcher (dark / neon modes)  
- Touch joystick controls
- For Mobile

---

## 📌 Author

**Ayush Rayal**

- 🎓 Student | Full Stack Developer
- 💼 LinkedIn: https://www.linkedin.com/in/ayush-rayal
- 💻 GitHub: https://github.com/ayushrayal

Built as a learning and portfolio project to strengthen core JavaScript fundamentals and game development logic.
