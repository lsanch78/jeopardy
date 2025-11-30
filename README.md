# Jeopardy! – Trivia Game

A browser-based multiplayer Jeopardy game built with Vue. Players compete by answering **True/False trivia questions** pulled dynamically from the [OpenTDB API](https://opentdb.com/).  

**[Play the Live Game](https://lsanch78.github.io/jeopardy/)**  

---

## Features
- 🎮 **Players**: 2–6 players supported.  
- 📚 **Categories**: Choose 4–8 trivia categories each game.  
- ✅ **True/False Questions**: Unique questions fetched live from the Trivia API.  
- 🔄 **Gameplay**:  
  - If you guess correctly, you take another turn.  
  - If you guess incorrectly, control passes to the next player.  
- 💰 **Double Jeopardy**:  
  - 10% chance a selected question becomes **Double Jeopardy**.  
  - Player can wager points (or automatically double if below the clue value).  
- 🏆 **Game End**: Game concludes once all answers are selected; the highest score wins.  
- 🖥️ **Best on Desktop**: Optimized for desktop play.  

---

## 🎮 How to Play
1. **Set Up the Game**  
   - Choose the number of players (2–6).  
   - Choose the number of categories (4–8).  

2. **Starting the Game**  
   - Each player begins with 0 dollars.  
   - Player 1 gets the first turn.  

3. **Taking a Turn**  
   - Select a question from the game board.  
   - Answer **True** or **False**.  
   - If correct: You earn the money and go again.  
   - If incorrect: You lose the money and the next player takes a turn.  

4. **Double Jeopardy!**  
   - Randomly triggered (10% chance).  
   - If you have enough money, you can **wager** an amount. Be warned, this means you also lose that amount if you're wrong! 
   - If not, the clue is worth **double the normal value**.  

5. **Winning the Game**  
   - The game ends once all questions are answered.  
   - The player with the highest score is declared the winner. 🎉  

---

##Tech Stack
- **Vue.js** frontend framework  
- **HTML5 / CSS3** UI & styling  
- **JavaScript** game logic  
- **OpenTDB API** for trivia questions  

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
