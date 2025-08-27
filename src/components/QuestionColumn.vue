<!--https://opentdb.com/api.php?amount=1&type=boolean-->

<script>
export default {
  name: 'QuestionColumn',
  props: {
    category: {
      type: Object,
      required: true,

    }
  },
  methods: {
    async getQuestion(difficulty, value) {


      if (this.waiting){
        console.warn("Wait 5 seconds before new question")
        return;
      }
      this.activeQuestion = true;
      try {
        this.waiting = true;

        console.log("Category ID into URL is ", this.category.id)
        console.log(difficulty)
        const url = `https://opentdb.com/api.php?amount=1&category=${this.category.id}&difficulty=${difficulty}&type=boolean`;
        const response = await fetch(url)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const question = data.results[0]

          this.activeValue = value;
          this.$emit("update-active", true)

          if (value === 200) this.easy1 = question.question
          if (value === 400) this.easy2 = question.question
          if (value === 600) this.medium1 = question.question
          if (value === 800) this.medium2 = question.question
          if (value === 1000) this.hard = question.question


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
    }
  },
  data() {
    return {
      easy1: "$200",
      easy2: "$400",
      medium1: "$600",
      medium2: "$800",
      hard: "$1000",
      activeQuestion: false
    }
  }
}
</script>

<template>

  <div class="question-column">
    <div class="cell" id="subject-cell">
      <p>{{ category.name }}</p>
    </div>

    <div class="cell" id="easy-cell1" @click="getQuestion('easy', 200)">
      <p v-if="!activeQuestion">{{ easy1 }}</p>
      <div v-else>
        <p  v-html="easy1"></p>
        <button @click.stop="checkAnswer('True')">True</button>
        <button @click.stop="checkAnswer('False')">False</button>

      </div>
    </div>





    <div class="cell" id="easy-cell2" @click="getQuestion('easy', 400)">
      <p>{{ easy2 }}</p>
    </div>
    <div class="cell" id="medium-cell1" @click="getQuestion('medium', 600)">
      <p>{{ medium1 }}</p>
    </div>
    <div class="cell" id="medium-cell2" @click="getQuestion('medium', 800)">
      <p>{{ medium2 }}</p>
    </div>
    <div class="cell" id="hard-cell"@click="getQuestion('medium', 1000)">
      <p>{{ hard }}</p>
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



.cell {
  border: 3px solid midnightblue;
  padding: 30px;
  background-color: darkblue;
  color: yellow;
  font-size: 1.3rem;
  margin: 5px;
  width: 270px;
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.cell:hover {
  box-shadow: 0px 0px 7px yellow;
  cursor: pointer;
}

</style>
