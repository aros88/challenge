/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import store from '../store';
import TodoForm from './TodoForm.vue';
import TodoItem from './TodoItem.vue';
import TodoList from './TodoList.vue';

describe('TodoList', () => {
  let dispatchCalls;
  beforeEach(() => {
    dispatchCalls = vi.spyOn(store, 'dispatch');
  });

  test('should render', () => {
    const getTodos = vi.fn();
    const createTodo = vi.fn();
    const updateTodo = vi.fn();
    const deleteTodo = vi.fn();
    const wrapper = mount(
      TodoList,
      {
        props: {
          getTodos,
          createTodo,
          updateTodo,
          deleteTodo,
        },
        global: {
          plugins: [store],
        }
      }
    );

    expect(wrapper.findAllComponents(TodoForm).length).toBe(1);
    expect(getTodos.mock.calls[0]).toMatchObject([1, 5]);
    expect(createTodo.mock.calls).toMatchObject([]);
    expect(updateTodo.mock.calls).toMatchObject([]);
    expect(deleteTodo.mock.calls).toMatchObject([]);
    expect(dispatchCalls).toHaveBeenCalledExactlyOnceWith('clearErrorMsg');

    expect(wrapper.find('.todo-list').exists()).toBeTruthy();
    expect(wrapper.find('.todo-list .title').exists()).toBeTruthy();
    
    const h2 = wrapper.find('.todo-list .title h2');
    expect(h2.exists()).toBeTruthy();
    expect(h2.text()).toBe('List of Todos  Double click on the todos to edit them');

    expect(wrapper.find('.todo-list .content').exists()).toBeTruthy();
    expect(wrapper.find('.todo-list .content .per-page').exists()).toBeTruthy();
    expect(wrapper.find('.todo-list .content .per-page .single-input-form').exists()).toBeTruthy();

    const input = wrapper.find('.todo-list .content .per-page .single-input-form input');
    expect(input.exists()).toBeTruthy();

    const button = wrapper.find('.todo-list .content .per-page .single-input-form button');
    expect(button.exists()).toBeTruthy();
    expect(button.text()).toBe('Apply');

    expect(wrapper.find('.todo-list .content div#reRenderKey').exists()).toBeTruthy();
    const pagination = wrapper.find('.todo-list .pagination');
    expect(pagination.exists()).toBeTruthy();
    expect(pagination.attributes('style')).toBe('display: none;');
  });

  test('lists todos', async () => {
    const getTodos = vi.fn().mockImplementation(async (page) => {
      return {
        todos: [
          {
            id: 1,
            title: 'Task 1',
            completed: false
          },
          {
            id: 2,
            title: 'Task 2',
            completed: false
          }
        ],
        pagination: {
          page,
          totalPages: 1
        }
      };
    });
    const createTodo = vi.fn();
    const updateTodo = vi.fn();
    const deleteTodo = vi.fn();

    const wrapper = await mount(
      TodoList,
      {
        props: {
          getTodos,
          createTodo,
          updateTodo,
          deleteTodo,
        },
        global: {
          plugins: [store],
        }
      }
    );

    expect(getTodos.mock.calls[0]).toMatchObject([1, 5]);
    expect(createTodo.mock.calls).toMatchObject([]);
    expect(updateTodo.mock.calls).toMatchObject([]);
    expect(deleteTodo.mock.calls).toMatchObject([]);
    expect(dispatchCalls).toHaveBeenCalledExactlyOnceWith('clearErrorMsg');

    await nextTick();
    expect(wrapper.findAllComponents(TodoItem).length).toBe(2);
    const pagination = wrapper.find('.todo-list .pagination');
    expect(pagination.exists()).toBeTruthy();
    expect(pagination.attributes('style')).toBe('display: none;');
  });

  test('manages pagination', async () => {
    localStorage.setItem('perPage', 1);
    const getTodos = vi.fn().mockImplementation(async (page) => {
      return {
        todos: [
          {
            id: 1,
            title: 'Task 1',
            completed: false
          },
          {
            id: 2,
            title: 'Task 2',
            completed: false
          },
          {
            id: 3,
            title: 'Task 3',
            completed: false
          },
          {
            id: 4,
            title: 'Task 4',
            completed: false
          },
          {
            id: 5,
            title: 'Task 5',
            completed: false
          }
        ],
        pagination: {
          page,
          totalPages: 2
        }
      };
    });
    const createTodo = vi.fn();
    const updateTodo = vi.fn();
    const deleteTodo = vi.fn();

    const wrapper = await mount(
      TodoList,
      {
        props: {
          getTodos,
          createTodo,
          updateTodo,
          deleteTodo,
        },
        global: {
          plugins: [store],
        }
      }
    );

    expect(getTodos.mock.calls[0]).toMatchObject([1, 1]);
    expect(createTodo.mock.calls).toMatchObject([]);
    expect(updateTodo.mock.calls).toMatchObject([]);
    expect(deleteTodo.mock.calls).toMatchObject([]);
    expect(dispatchCalls).toHaveBeenCalledExactlyOnceWith('clearErrorMsg');

    await nextTick();
    expect(wrapper.findAllComponents(TodoItem).length).toBe(5);
    const pagination = wrapper.find('.todo-list .pagination');
    expect(pagination.exists()).toBeTruthy();
    expect(pagination.attributes('style')).not.toBeTruthy();
  });
});
