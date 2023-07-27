import { shallowMount } from '@vue/test-utils'
import TodoEditItem from '../components/TodoEditItem.vue'

describe("Todo edit item comp", () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(TodoEditItem, {
            props: {
                modelValue: 'test'
            }
        })
    })

    it("should access props", async () => {
        const editInput = wrapper.find(`input[type="text"]`)
        expect(editInput.element.value).toBe('test')
    })

    it("should not emit update:modelValue when edit input empty", async () => {
        const editInput = wrapper.find(`input[type="text"]`)
        await editInput.setValue('')

        await wrapper.vm.editName(editInput.element.value)
        expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    })

    it("should emit update:modelValue when edit input not empty", async () => {
        const editInput = wrapper.find(`input[type="text"]`)
        await editInput.setValue('edit todo name')
        await wrapper.vm.editName(editInput.element.value)

        expect(editInput.element.value).toBe('edit todo name')
        expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })
})