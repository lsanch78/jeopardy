<script setup>
import QuestionColumn from './components/QuestionColumn.vue'

</script>

<template>
  <header>


  </header>
  <main>
    <div id="game-table">
    <QuestionColumn></QuestionColumn>
    <QuestionColumn></QuestionColumn>
    <QuestionColumn></QuestionColumn>
    <QuestionColumn></QuestionColumn>
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

 main {
 background-color: black;
}

</style>
