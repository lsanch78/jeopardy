<script>
export default {
  name: "CurrentQuestion",
  props: {},
  data() {},
  methods: {}
}


</script>

<template>

  <div class="question">
    <h1>Current Question Goes Here</h1>

    <div class="buttons">
      <form class="select-choice">
        <input type="radio">True
        <br>
        <input type="radio">False
      </form>
    </div>
  </div>



</template>

<style scoped>

.question {
  display: flex;
  padding: 30px;
  background-color: darkblue;
  color: yellow;
  font-size: 1.3rem;
  margin: auto;
  text-align: center;
  width: 70%;
  height: 100%;
  justify-content: center;
}


</style>