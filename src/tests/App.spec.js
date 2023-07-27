import { mount  } from "@vue/test-utils";
import App from '../App.vue'

describe('App dashboard', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(App)
    })
    it('initialize app', () => {
        const h1 = wrapper.get('h1').text()
        
        expect(h1).toBe("To-Do List")
    })

    it("show default list render", async () => {
        const info = wrapper.get('[data-test="todo-info"]')
        const checkbox1 = await wrapper.find('input[value="Learn vue todo"]')
        expect(checkbox1.element.checked).toBe(false)

        const checkbox2 = await wrapper.find('input[value="Nodejs best practices"]')
        expect(checkbox2.element.checked).toBe(true)

        const totalTodoList = await wrapper.vm.totalTodoList
        const todosCompleted = await wrapper.vm.todosCompleted
        
        expect(totalTodoList).toBe(2)
        expect(todosCompleted).toBe(1)
        expect(info.text()).toBe(`1 out of 2 items completed`)

    })

    it("should update count completed item", async () => {
        const info = wrapper.get('[data-test="todo-info"]')
        const checkbox1 = await wrapper.find('input[value="Learn vue todo"]')
        checkbox1.setChecked()
        const totosCompleted = await wrapper.vm.todosCompleted

        expect(checkbox1.element.checked).toBe(true)
        expect(totosCompleted).toBe(2)
        
        expect(info.text()).toBe('2 out of 2 items completed')
    })

    it("should able delete todo item", async () => {
        const input = wrapper.find('input[data-test="todo-input"]')
        await input.setValue('hello new todo')

        const addSubmit = wrapper.find('button[type="submit"]')
        await addSubmit.trigger('submit')

        // delete
        expect(wrapper.vm.todoItems).toHaveLength(3)
        await wrapper.vm.deleteTodo(wrapper.vm.todoItems[2])
        expect(wrapper.vm.todoItems).toHaveLength(2)
    })

    it("should able update todo item", async () => {
        await wrapper.find('button[name="edit"]').trigger('click')
        const input = wrapper.find('input[data-test="todo-input"]')
        await input.setValue('update new todo')

        // await wrapper.find('button[name="save"]').trigger('click')
        await wrapper.vm.updateTodo(wrapper.vm.todoItems[1])
    })
})