import { shallowMount } from "@vue/test-utils";
import TodoItem from "../components/TodoItem.vue";

describe("Todo item", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem);
  });

  it("initlizated comp", () => {
    const title = wrapper.get('[data-test="title"]');
    const input = wrapper.get('[type="text"]');
    const refTodo = wrapper.vm.todo; // get ref todo property
    const submit = wrapper.get('[data-test="submit-button"]');

    expect(title.text()).toBe("what needs to be done?");
    expect(refTodo).toBe("");
    expect(input.text()).toBe("");
    expect(submit.text()).toBe("Add");
  });

  it("should not able to add new todo when todo is empty", async () => {
    expect(wrapper.vm.todo).toBe("");
    const addSubmit = wrapper.find('button[type="submit"]');
    await addSubmit.trigger("submit");

    expect(wrapper.emitted()).not.toHaveProperty("createTodo");
    expect(wrapper.vm.todo).toBe("");
  });

  it("should add new todo", async () => {
    const input = wrapper.find('input[data-test="todo-input"]');

    await input.setValue("hello new todo");

    expect(input.element.value).toBe("hello new todo");
    expect(wrapper.vm.todo).toBe("hello new todo");

    await wrapper.get('button[type="submit"]').trigger("submit");

    expect(wrapper.emitted()).toHaveProperty("createTodo");
  });
});
