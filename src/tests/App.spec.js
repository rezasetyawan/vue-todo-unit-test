import { mount } from "@vue/test-utils";
import App from "../App.vue";
describe("App dashboard", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(App);
  });

  const addTodoItem = async () => {
    const input = wrapper.find('input[data-test="todo-input"]');
    await input.setValue("hello new todo");

    const addSubmit = wrapper.find('button[type="submit"]');
    await addSubmit.trigger("submit");
  };

  it("initialize app", () => {
    expect(wrapper.get("h1").exists()).toBe(true);
  });

  it("show default list render", async () => {
    const info = wrapper.get('[data-test="todo-info"]');
    const checkbox1 = await wrapper.find('input[value="Learn vue todo"]');
    expect(checkbox1.element.checked).toBe(false);

    const checkbox2 = await wrapper.find(
      'input[value="Nodejs best practices"]'
    );
    expect(checkbox2.element.checked).toBe(true);

    const totalTodoList = await wrapper.vm.totalTodoList;
    const todosCompleted = await wrapper.vm.todosCompleted;

    expect(totalTodoList).toBe(2);
    expect(todosCompleted).toBe(1);
    expect(info.text()).toBe(`1 out of 2 items completed`);
  });

  it("should update count completed item", async () => {
    const info = wrapper.get('[data-test="todo-info"]');
    const checkbox1 = await wrapper.find('input[value="Learn vue todo"]');
    checkbox1.setChecked();
    const todosCompleted = await wrapper.vm.todosCompleted;

    expect(checkbox1.element.checked).toBe(true);
    expect(todosCompleted).toBe(2);

    expect(info.text()).toBe("2 out of 2 items completed");
  });

  it("should able add todo item", async () => {
    await addTodoItem();

    expect(wrapper.vm.todoItems).toHaveLength(3);
  });

  it("should able add and delete todo item", async () => {
    await addTodoItem();

    expect(wrapper.vm.todoItems).toHaveLength(3);
    await wrapper.vm.deleteTodo(wrapper.vm.todoItems[2]);
    expect(wrapper.vm.todoItems).toHaveLength(2);
  });

  it("should able update todo itemm", async () => {
    const editbtn = wrapper.find('button[name="edit"]');
    console.log(editbtn.text());
    await editbtn.trigger("click");

    await wrapper
      .find('input[data-test="todo-input"]')
      .setValue("update new todo");

    const updatebtn = wrapper.find('button[name="save"]');
    await updatebtn.trigger("click");
    console.log(updatebtn.text());

    await wrapper.vm.updateTodo({
      id: "1",
      isCompleted: false,
      name: "update new todo",
    });

    expect(wrapper.vm.todoItems[0].name).toBe("update new todo");
  });
});
