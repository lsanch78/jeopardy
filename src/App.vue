<script>
import './App.css'
import QuestionColumn from "./components/QuestionColumn.vue"
import PlayerScore from "./components/PlayerScore.vue"

class Player {
  constructor(number) {
    this.number = number
    this.score = 0
    this.active = false
  }


  addScore(val) {
    this.score += val
  }

}


let endOfGame = false;
let currentCategory;
let currentCellKey;
let questionsCompleted = 0;



export default {
  name: 'App',
  components: {QuestionColumn, PlayerScore},
  data() {
    return {
      categories: [], // 4 random picked categories
      players: [], // number of players
      currentQuestion: null,
      currentValue: 0,
      currentGameStatus: "",
      currentTurn: 0,
      activeQuestion: false,
      easy1: "$200",
      easy2: "$400",
      medium1: "$600",
      medium2: "$800",
      hard: "$1000",
      gameIsSet: false,
      selectedPlayers: 2,
      selectedCategories: 4,
      doubleJeopardyWager: false,
      wager: 0
    }
  },

  methods: {

    startGame() {


      // deactivate all first
      this.players.forEach(p => (p.active = false))

      // set first turn
      this.currentTurn = 0
      this.players[this.currentTurn].active = true
      this.currentGameStatus = `Game start — Player ${this.currentTurn + 1}'s turn`
    },

    nextTurn(){
      if (endOfGame) return

      this.players.forEach(p => (p.active = false))

      this.currentTurn++
      if (this.currentTurn >= this.players.length) {
        console.log("Looping back to player 1")
        this.currentTurn = 0
      }

      this.players[this.currentTurn].active = true;
      this.currentGameStatus = `Player ${this.currentTurn + 1}'s turn`
    },

    numberOfPlayers(numOfPlayers = 3) {
      for (let i = 0; i < numOfPlayers; i++) {
        this.players.push(new Player(i + 1))
      }
    },


    randomListOfCategories(amount) {
      const min = 9
      const max = 32
      const excluded = [10, 13, 21, 26, 27, 29, 30, 32]

      const allowed = []
      for (let i = min; i <= max; i++) {
        if (!excluded.includes(i)) {
          allowed.push(i)
        }
      }

      // shuffle
      for (let i = allowed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[allowed[i], allowed[j]] = [allowed[j], allowed[i]]
      }

      return allowed.slice(0, amount)
    },

    async getCategories(numberOfCategories = 4) {
      const categoriesURL = "https://opentdb.com/api_category.php"

      try {
        const response = await fetch(categoriesURL)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json()
        const randomCategories = this.randomListOfCategories(numberOfCategories)

        // pick the 4 objects by ID
        this.categories = randomCategories.map(id => {
         const baseCat = data.trivia_categories.find(cat => cat.id === id)


         return {
           ...baseCat,
           cells: {
             easy1: "$200",
             easy2: "$400",
             medium1: "$600",
             medium2: "$800",
             hard: "$1000"
           }
         }

        }
        )

        console.log(this.categories)
      } catch (error) {
        console.error(error.message)
      }
    },
    awardPoints(value) {
      const currentPlayer = this.players[this.currentTurn]
      currentPlayer.addScore(value)

      if (currentPlayer.score < 0) {
        currentPlayer.score = 0
      }
    },

    handleCurrentQuestion(question, value) {
      this.currentQuestion = question
      this.currentValue = value

      if (Math.random() < 0.1) {
        this.currentGameStatus = `!!DOUBLE JEOPARDY!! The category chosen is: ${this.currentQuestion.category}, at ${this.currentQuestion.difficulty} difficulty`
        const currentPlayer = this.players[this.currentTurn]

        if (currentPlayer.score < value) {
          this.currentValue = value * 2
        }else {
          console.log("Implement Double Jeopardy Wager Prompt")
          this.doubleJeopardyWager = true;
        }
      } else {this.currentGameStatus = `The category chosen is: ${this.currentQuestion.category}, at ${this.currentQuestion.difficulty} difficulty`}


      this.activeQuestion = true

    },


    handleAnswer({ categoryId, cellKey, correct }) {
      currentCategory = categoryId
      currentCellKey = cellKey
      console.log(categoryId, cellKey, correct)
      const cat = this.categories.find(c => c.id === categoryId)

      if (cat) {
        const color = correct ? "limegreen" : "red"
        cat.cells[cellKey] =
            `<span style="color:${color}">P${this.players[this.currentTurn].number}</span>`
      }

      if (correct === undefined){
        cat.cells[cellKey] = `<span style="color:white">P${this.players[this.currentTurn].number}</span>`
      }


    },

    async checkAnswer(proposed, value) {
      const correct = this.currentQuestion.correct_answer === proposed
      if (correct) {
        this.awardPoints(value)
        this.currentGameStatus = "CORRECT! Choose another question!"
      } else {
        this.awardPoints(-value)
        this.currentGameStatus = "INCORRECT! Next player's turn"
        await new Promise(resolve => setTimeout(resolve, 1000));
      }


      this.handleAnswer({
        categoryId: currentCategory,
        cellKey: currentCellKey,
        correct: correct,
      })

      if (!correct) {
        this.nextTurn()
      }

      questionsCompleted++;
      this.checkEndGame(questionsCompleted);
      this.currentValue = 0
      this.currentQuestion = null
      this.activeQuestion = false
    },

    checkEndGame(questionsCompleted) {
      console.log("questions needed to complete game: ", this.categories.length * 5)
      if (questionsCompleted === (this.categories.length * 5)) {
        const winner = this.players.reduce((max, player) => {
          return player.score > max.score ? player : max
        }, this.players[0])

        this.currentGameStatus = `Player ${winner.number} has won the game!`
        console.log("Game is Over")
      }
    },

    setGameUp(){
      console.log("Players:", this.selectedPlayers)
      console.log("Categories:", this.selectedCategories)
      this.getCategories(this.selectedCategories)
      this.numberOfPlayers(this.selectedPlayers)
      this.gameIsSet = true
      this.startGame()
    },

    submitWager() {
      console.log("Player wagered:", this.wager)
      const currentPlayer = this.players[this.currentTurn]
      if (this.wager <= 0 || this.wager > currentPlayer.score) {
        this.currentGameStatus = "Wager Must Be Less Than Your Score and Greater Than Zero"
      } else {
        this.currentGameStatus = `Wager accepted: $${this.wager}`
        this.currentValue = this.wager
        this.doubleJeopardyWager = false
      }
    },

  },

  mounted() {

    console.log("Array of Players =", this.players)
  }
}
</script>

<template>
  <header>


  </header>

  <div v-if="!gameIsSet" id="game-settings-wrapper">
    <h1>Game Settings</h1>
    <form id="game-settings" @submit.prevent="setGameUp">
      <p>Number of Players</p>
      <select v-model="selectedPlayers" id="num-of-players">
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <p>Number of Categories</p>
      <select v-model="selectedCategories" id="num-of-categories">
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <br><br>
      <input type="submit" value="Start New Game">
    </form>
  </div>

    <div id="player-scoreboard">
      <PlayerScore v-for="player in players"
                    :key="player.number"
                    :player="player"
      />
    </div>
      <div id="game-status">
        <h2 v-html="currentGameStatus"></h2>
      </div>
    <div id="game-table">
      <QuestionColumn v-for="cat in categories"
                      :key="cat.id"
                      :category="cat"
                      :player="this.players[this.currentTurn]"
                      :activeQuestion="activeQuestion"
                      @answered="handleAnswer"
                      @current-question="handleCurrentQuestion"
      />
    </div>

<!--  Current Question -->

  <div v-if="gameIsSet" class="question-box">
    <div v-if="doubleJeopardyWager">
        <form class="wager-input" @submit.prevent="submitWager">
          <h2>Enter your wager: </h2>
          <input type="number" v-model.number="wager">
          <input type="submit" value="Submit">
        </form>
    </div>
    <div v-if="currentQuestion && !doubleJeopardyWager">
    <h2 v-html="currentQuestion.question"></h2>
      <div class="buttons">
        <form class="select-choice">
          <input type="button" value="true" @click="checkAnswer('True', currentValue)">
          <input type="button" value="false" @click="checkAnswer('False', currentValue)">
        </form>
      </div>
      <br>
    </div>
    <div v-if="!currentQuestion">
      <h2>{{ currentGameStatus }}</h2>
      <br>
    </div>

  </div>



</template>