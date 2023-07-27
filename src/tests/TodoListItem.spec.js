import { shallowMount } from '@vue/test-utils'
import TodoListItem from '../components/TodoListItem.vue'

describe("Todo list item comp", () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(TodoListItem)
    })

    it("emit delete todo", async () => {
        // const emitted = wrapper.emitted('delete')
        const deleteBtn = wrapper.find('button[name="delete"]')
        await deleteBtn.trigger('click')

        expect(wrapper.emitted()).toHaveProperty('delete')
    })

    it("emit save todo", async () => {
        await wrapper.find('button[name="edit"]').trigger('click')
        await wrapper.find('button[name="save"]').trigger('click')

        expect(wrapper.emitted()).toHaveProperty('save')
    })
})