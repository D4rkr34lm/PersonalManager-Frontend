<template>
  <p>{{ text }}</p>
</template>
<script lang="ts">
export default {
  props: {
    text: String
  }
}
</script>
<style>
p {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
