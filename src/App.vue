<script setup lang="ts">
import TodoItem from "./components/TodoItem.vue";
import TodoListItem from "./components/TodoListItem.vue";
import { Todo } from './Todo.ts';
import { ref, computed } from 'vue';

// initialize default list todo items
const todoItems = ref<Todo[]>([
  {
    id: '1',
    isCompleted: false,
    name: 'Learn vue todo'
  },
  {
    id: '2',
    isCompleted: true,
    name: 'Nodejs best practices'
  }
])

// get total todo items
const totalTodoList = computed(() => todoItems.value.length)

// get completed todo items
const todosCompleted = computed(() =>
  todoItems.value.filter((f) => f.isCompleted === true).length
)

/**
 * Update completed when user click checkbox
 * @param todo
 */
function updateCompleted(todo: Todo) {
  const index = todoItems.value.findIndex((f) => f.id === todo?.id)
  todoItems.value[index] = { ...todoItems.value[index], ...todo }
}

/**
 * Delete todo item
 * @param todo
 */
function deleteTodo(todo: Todo) {
  const index = todoItems.value.findIndex((f) => f.id === todo?.id)
  todoItems.value.splice(index, 1)
}

function updateTodo(todo: Todo) {
  const index = todoItems.value.findIndex((f) => f.id === todo?.id)
  todoItems.value[index].name = todo.name
}

/**
 * Add todo item into list todo
 * @param name: todo name
 */
const todoItem = (name: string) => {
  todoItems.value.push({
    id: `${Math.floor(Math.random() * 100) + 1}`,
    isCompleted: false,
    name
  })
}
</script>

<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <!--  form  create todo item-->
    <TodoItem @create-todo="todoItem"></TodoItem>

    <!--  list todo item-->
    <h2>{{ todosCompleted }} out of {{ totalTodoList }} items completed</h2>
    <template v-for="item in todoItems" :key="item">
      <TodoListItem
          :item="item"
          @completed="updateCompleted"
          @delete="deleteTodo"
          @save="updateTodo"
      >
      </TodoListItem>
    </template>

  </div>
</template>

<style scoped lang="postcss">
.todo-list {
  background-color: white;
  color: black;
  min-height: 100vh;
  min-width: 400px;
  padding: 0 6px;
}
</style>
