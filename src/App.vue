<script>
import CurrentQuestion from "./components/CurrentQuestion.vue"
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

  startTurn() {
    this.active = true
  }

  endTurn() {
    this.active = false
  }

}

const endOfGame = false;


export default {
  name: 'App',
  components: {CurrentQuestion, QuestionColumn, PlayerScore},
  data() {
    return {
      categories: [], // 4 random picked categories
      players: [], // number of players
    }
  },

  methods: {

    startGame() {
      // deactivate all first
      this.players.forEach(p => (p.active = false))

      // set first turn
      this.currentTurn = 0
      this.players[this.currentTurn].active = true
      console.log(`Game start — Player ${this.currentTurn + 1}'s turn`)
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
      console.log(`It is Player ${this.currentTurn + 1}'s turn`)
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
        this.categories = randomCategories.map(
            id => data.trivia_categories.find(cat => cat.id === id)
        )

        console.log(this.categories)
      } catch (error) {
        console.error(error.message)
      }
    },





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

  <main>
    <div id="player-scoreboard">
      <PlayerScore v-for="player in players"
                    :key="player.number"
                    :player="player"
      />
    </div>
    <div id="game-table">
      <QuestionColumn v-for="cat in categories"
                      :key="cat.id"
                      :category="cat">
      </QuestionColumn>
    </div>
  </main>
</template>

<style>
#game-table {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
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
body {
  padding: 0;
  margin: 0;
  background-color: black;
}

</style>
