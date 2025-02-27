/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import TodoForm from './TodoForm.vue';

describe('TodoForm', () => {
  test('should render', () => {
    const wrapper = mount(TodoForm);

    expect(wrapper.find('form.form').exists()).toBeTruthy();
    expect(wrapper.find('form.form .single-input-form').exists()).toBeTruthy();

    const input = wrapper.find('form.form .single-input-form input');
    expect(input.exists()).toBeTruthy();
    expect(input.attributes('placeholder')).toBe('New todo...');
    expect(input.attributes('autofocus')).not.toBeUndefined();

    const button = wrapper.find('form.form .single-input-form button');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe('Create');
    expect(button.attributes('type')).toBe('submit');

    const err = wrapper.find('.error-msg');
    expect(err.exists()).toBeTruthy();
    expect(err.attributes('style')).toBe('display: none;');
  });

  test('should validate input', async () => {
    const wrapper = mount(TodoForm);
    const input = wrapper.find('form.form .single-input-form input');
    await input.setValue('    ');
    expect(input.element.value).toBe('    ');
    
    const form = wrapper.find('form.form');
    await form.trigger('submit');
    const err = wrapper.find('.error-msg');
    expect(err.exists()).toBeTruthy();
    expect(err.attributes('style')).not.toBeTruthy();
    expect(err.text()).toBe('Title cannot be blank');

    expect(wrapper.emitted('create-todo')).toBeUndefined();
  });

  test('emits correct event on submit', async () => {
    const wrapper = mount(TodoForm);
    const todoTitle = 'Test todo';

    const input = wrapper.find('form.form .single-input-form input');
    await input.setValue(todoTitle);
    expect(input.element.value).toBe(todoTitle);

    const form = wrapper.find('form.form');
    await form.trigger('submit');
    expect(wrapper.emitted('create-todo')[0]).toEqual([todoTitle]);
  });
});
