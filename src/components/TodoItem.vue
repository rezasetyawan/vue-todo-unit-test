<script setup lang="ts">
import { ref } from 'vue';
const todo = ref('')
const emit = defineEmits(['createTodo'])

function submit() {
  if (todo.value === '') return
  // emit todo here
  emit('createTodo', todo.value)
  // clear input todo
  todo.value = ''
}

// defineExpose({ emit })

</script>

<template>
  <div>
    <h3 data-test="title">what needs to be done?</h3>
    <form @submit.prevent="submit">
      <input type="text" data-test="todo-input" v-model.trim="todo" />
      <button data-test="submit-button" type="submit">Add</button>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

form > input {
  height: 25px;
}
</style>