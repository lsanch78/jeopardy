<script>
import CurrentQuestion from "./components/CurrentQuestion.vue"
import QuestionColumn from "./components/QuestionColumn.vue"

export default {
  name: 'App',
  components: {CurrentQuestion, QuestionColumn},

  data() {
    return {
      categories: [] // will hold the 4 picked categories
    }
  },

  methods: {
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
  }
}
</script>

<template>
  <header>


  </header>

  <main>
    <CurrentQuestion></CurrentQuestion>
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

main {
  padding: 0;
  margin: 0;
  background-color: black;
}

</style>
