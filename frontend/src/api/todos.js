
export const getTodos = async (page = 1, perPage = 5) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks?perPage=${perPage}&page=${page}`,
    );

    const data = await response.json();

    return {
      todos: data.tasks.map((todo) => {
        return {
          id: todo.id,
          title: todo.title,
          completed: todo.completed
        };
      }),
      pagination: data.pagination
    };
  } catch (err) {
    console.error('error fetching data', err);

    throw err;
  }
};

export const createTodo = async (title) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });

    const todo = await response.json();
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    };
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const updateTodo = async (id, title, completed) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        completed,
      }),
    });

    return true;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const deleteTodo = async (id) => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return true;
  } catch (err) {
    console.error(err);

    throw err;
  }
};
