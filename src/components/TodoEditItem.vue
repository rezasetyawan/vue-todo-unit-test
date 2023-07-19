<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const editInput = ref<HTMLInputElement>(null)
const labelTodoName = props.modelValue

function editName(val: string) {
  if (val.trim() === '') return
  emit('update:modelValue', val)
}

onMounted(() => {
  // check focus when edit input
  if(editInput.value) {
    editInput.value.focus()
  }
})
</script>

<template>
  <label>Edit Name for {{ labelTodoName }}</label>
  <input
      ref="editInput"
      type="text"
      :value="props.modelValue"
      @input="editName($event.target.value)"
  />
</template>

<style scoped>

label {
  text-align: start;
  font-size: 1.2rem;
}
input {
  height: 25px;
  font-size: 1.2rem;
  width: 100%;
}

</style>