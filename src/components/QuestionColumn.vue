<!--https://opentdb.com/api.php?amount=1&type=boolean-->

<script>
export default {
  name: 'QuestionColumn',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    async getQuestion(difficulty, value) {
      if (this.waiting){
        console.warn("Wait 5 seconds before new question")
        return;
      }

      try {
        this.waiting = true;

        console.log("Category ID into URL is ", this.category.id)
        console.log(difficulty)
        const url = `https://opentdb.com/api.php?amount=1&category=${this.category.id}&difficulty=${difficulty}&type=boolean`;
        const response = await fetch(url)
        const data = await response.json()

        if (data.results && data.results.length > 0) {
          const question = data.results[0]
          console.log(question.question)
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
  }
}
</script>

<template>

  <div class="question-column">
    <div class="cell" id="subject-cell">
      <p>{{ category.name }}</p>
    </div>
    <div class="cell" id="easy-cell1" @click="getQuestion('easy', 200)">
      <p>$200</p>
    </div>
    <div class="cell" id="easy-cell2" @click="getQuestion('easy', 400)">
      <p>$400</p>
    </div>
    <div class="cell" id="medium-cell1" @click="getQuestion('medium', 600)">
      <p>$600</p>
    </div>
    <div class="cell" id="medium-cell2" @click="getQuestion('medium', 800)">
      <p>$800</p>
    </div>
    <div class="cell" id="hard-cell"@click="getQuestion('medium', 1000)">
      <p>$1000</p>
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
  text-align: center;
  width: 270px;
}

.cell:hover {
  box-shadow: 0px 0px 7px yellow;
  cursor: pointer;
}

</style>
