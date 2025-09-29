<script>
export default {
  name: "PlayerScore",
  props: {
    player: {
      type: Object,
      required: true
    }
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
  <p>Player {{ player.number }}: ${{ player.score }}</p>
  </div>
</template>