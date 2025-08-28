<!--https://opentdb.com/api.php?amount=1&type=boolean-->

<script>
export default {
  name: 'QuestionColumn',
  props: {
    category: {
      type: Object,
      required: true,
    },
    player: {
      type: Object,
      required: true,
    },
    activeQuestion: Boolean,
    easy1: String,
    easy2: String,
    medium1: String,
    medium2: String,
    hard: String
  },
  methods: {
    async getQuestion(difficulty, value, cellKey) {
    if (this.activeQuestion) return;

      if (this.waiting) {
        console.warn("Wait 5 seconds before new question")
        return;
      }
      try {
        this.waiting = true;

        const url = `https://opentdb.com/api.php?amount=1&category=${this.category.id}&difficulty=${difficulty}&type=boolean`;
        const response = await fetch(url)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const question = data.results[0]


          // update currQ and currVal
          this.currentQuestion = data.results[0]
          this.currentValue = value;


          this.$emit("answered", { categoryId: this.category.id, cellKey });
          this.$emit("current-question", question, value)


          console.log("Correct Answer:", question.correct_answer)
        } else {
          console.warn("No question returned.")
        }


        setTimeout(() => {
          this.waiting = false
        }, 5000)


      } catch (error) {
        console.log("error fetching question: ", error)
      }


    },


  },
  data() {
    return {
      currentQuestion: null,
      currentValue: 0,
    }
  }
}
</script>

<template>

  <div class="question-column">
    <div class="cell" id="subject-cell">
      <h5>{{ category.name }}</h5>
    </div>

    <div class="cell" id="easy-cell1" @click="getQuestion('easy', 200, 'easy1')">
      <h1 v-html="category.cells.easy1"></h1>
    </div>

    <div class="cell" id="easy-cell2" @click="getQuestion('easy', 400, 'easy2')">
      <h1 v-html="category.cells.easy2"></h1>
    </div>
    <div class="cell" id="medium-cell1" @click="getQuestion('medium', 600, 'medium1')">
      <h1 v-html="category.cells.medium1"></h1>
    </div>
    <div class="cell" id="medium-cell2" @click="getQuestion('medium', 800,'medium2')">
      <h1 v-html="category.cells.medium2"></h1>
    </div>
    <div class="cell" id="hard-cell" @click="getQuestion('hard', 1000, 'hard')">
      <h1 v-html="category.cells.hard"></h1>
    </div>

  </div>


</template>

<style>


.question-column {
  font-family: "Arial Black", "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

#subject-cell {
  color: white;
  font-weight: bold;
}


p {
  font-family: "Times New Roman", Times, serif;
  font-size: 1rem;
}


.cell {
  border: 3px solid midnightblue;
  padding: 15px;
  background-color: darkblue;
  color: yellow;
  font-size: 1.3rem;
  margin: 5px;
  width: 200px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.cell:hover {
  box-shadow: 0px 0px 7px yellow;
  cursor: pointer;
}


.question-box {
  display: flex;
  align-items: center;
  margin: -50px auto 0px auto;
  padding: 30px;
  background-color: darkblue;
  color: yellow;
  font-size: 1.3rem;
  text-align: center;
  width: 70%;
  height: 100%;
  justify-content: center;
}


</style>
