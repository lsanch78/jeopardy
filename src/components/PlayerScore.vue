<script>
export default {
  name: "PlayerScore",
  props: {
  },
  data() {
    return {
      playerNum: 0,
      score: 0
    }
  },
  methods: {}
}
</script>

<template>
<div class="wrapper">
  <p>Player {{ playerNum }}: ${{ score }}</p>
  </div>
</template>

<style>

.wrapper {
  display: flex;
  font-family: "Arial Black", "Arial", sans-serif;
  font-weight: bold;
  color: violet;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  width: 200px;
}

</style>