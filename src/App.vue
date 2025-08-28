<script>
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
var currentCategory;
var currentCellKey;
var questionsCompleted = 0;


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
      easy1: "$200",
      easy2: "$400",
      medium1: "$600",
      medium2: "$800",
      hard: "$1000",
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


    randomFourCategories() {
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

      return allowed.slice(0, 4)
    },

    async getCategories() {
      const categoriesURL = "https://opentdb.com/api_category.php"

      try {
        const response = await fetch(categoriesURL)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json()
        const randomCategories = this.randomFourCategories()

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
      this.currentQuestion = question;
      this.currentValue = value;
      console.log("What is the value: ", this.currentQuestion);
      this.currentGameStatus = `The category chosen is: ${this.currentQuestion.category}, at ${this.currentQuestion.difficulty} difficulty`
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
        await new Promise(resolve => setTimeout(resolve, 2000));
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
      console.log("Number of questions completed, need 20 for EOG", questionsCompleted)
      this.checkEndGame(questionsCompleted);
      this.currentValue = 0
      this.currentQuestion = null
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
    }
  },

  mounted() {
    this.getCategories()
    this.numberOfPlayers(3)
    this.startGame()
    console.log("Array of Players =", this.players)
  }
}
</script>

<template>
  <header>


  </header>


    <div id="player-scoreboard">
      <PlayerScore v-for="player in players"
                    :key="player.number"
                    :player="player"
      />
    </div>
      <div id="game-status">
        <h2>{{ currentGameStatus }}</h2>
      </div>
    <div id="game-table">
      <QuestionColumn v-for="cat in categories"
                      :key="cat.id"
                      :category="cat"
                      :player="this.players[this.currentTurn]"
                      @answered="handleAnswer"
                      @current-question="handleCurrentQuestion"
      />
    </div>

<!--  Current Question -->

  <div class="question-box">
    <div v-if="currentQuestion">
    <h2 v-html="currentQuestion.question"></h2>
      <br>
    </div>
    <div v-if="!currentQuestion">
      <h2>{{ currentGameStatus }}</h2>
      <br>
    </div>
    <div class="buttons">
      <form class="select-choice">
        <input type="button" value="true" @click="checkAnswer('True', currentValue)">
        <input type="button" value="false" @click="checkAnswer('False', currentValue)">
      </form>
    </div>
  </div>



</template>

<style>
#game-table {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: -200px auto 0px auto;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

#player-scoreboard {
  margin-top: 30px;
  margin-bottom: -50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#game-status {
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: -120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: yellow;
}

body {
  padding: 0;
  margin: 0;
  background-color: black;
}

.question-box {
  margin-top: -200px;
  display: flex;
  flex-direction: column;
}

.buttons input[type="button"] {
  margin: 5px;
  font-weight: bold;
  padding: 10px 20px;
}

.buttons input[type="button"]:hover {
  cursor: pointer;
  margin: 5px;
  font-weight: bold;
  padding: 10px 20px;
}
</style>
