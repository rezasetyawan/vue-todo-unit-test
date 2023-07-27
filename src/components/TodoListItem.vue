<script setup lang="ts">
import { ref, PropType } from "vue";
import {Todo} from "../Todo.ts";
import TodoEditItem from "./TodoEditItem.vue";

const props = defineProps({
  item: {
    type: Object as PropType<Todo>,
    require: true
  },
})
const emit = defineEmits(['completed', 'delete', 'save'])

const isEdit = ref<boolean>(false)
const editName = ref<string>(props.item?.name)

function handleUpdateCompleted() {
  const updateTodo = {
    ...props.item,
    isCompleted: !props.item?.isCompleted,
  } as Todo

  emit('completed', updateTodo)
}

function handleDeleteTodo() {
  emit('delete', props.item)
}

function saveTodo() {
  const update = { ...props.item, name: editName }
  emit('save', update)
  isEdit.value = !isEdit.value
}
</script>

<template>
  <div class="todo-list_items">
    <template v-if="!isEdit">
      <div class="todo-list_items--checkbox">
        <input
            type="checkbox"
            :value="props.item?.name"
            :checked="props.item?.isCompleted"
            @input="handleUpdateCompleted"
            name="todo-name-checkbox"

        />
        <label for="todo" data-test="todo-name-label">{{ props.item?.name }}</label>
      </div>
      <div class="todo-list_items--buttons">
        <button type="button" name="edit" @click="isEdit = !isEdit">Edit</button>
        <button type="button" name="delete" @click="handleDeleteTodo">
          Delete
        </button>
      </div>
    </template>

    <template v-else>
      <div class="todo-list_items--edit">
        <TodoEditItem
            v-model="editName"
        >

        </TodoEditItem>
        <div class="todo-list_items--buttons todo-list_items--edit-buttons">
          <button type="button" name="cancel" @click="isEdit = !isEdit">
            Cancel
          </button>
          <button type="button" name="save" @click="saveTodo">
            Save
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
h2 {
  text-align: start;
}

ul > li {
  list-style-type: none;
}

.todo-list {

  &_items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;

    &--checkbox {
      display: flex;
      flex-direction: row;
      align-items: center;

      input {
        width: 35px;
        height: 35px;
      }
      label {
        font-size: 1rem;
      }
    }

    &--edit {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: 100%;
      padding: 6px 0;
    }
    &--edit-buttons {
      margin-top: 6px !important;
    }

    &--buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      gap: 6px;

      button[name="delete"] {
        background-color: red;
      }
    }
  }
}

</style>