<!--https://opentdb.com/api.php?amount=1&type=boolean-->

<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>

  <div class="question-column">
    <div class="cell" id="subject-cell">
      <p>Subject Goes Here</p>
    </div>
    <div class="cell" id="easy-cell1">
      <p>$200</p>
    </div>
    <div class="cell" id="easy-cell2">
      <p>$400</p>
    </div>
    <div class="cell" id="medium-cell1">
      <p>$600</p>
    </div>
    <div class="cell" id="medium-cell2">
      <p>$800</p>
    </div>
    <div class="cell" id="hard-cell">
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
}

.cell:hover {
  box-shadow: 0px 0px 7px yellow;
  cursor: pointer;
}

</style>
