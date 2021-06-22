import * as React from 'react';
import { InputTodo } from './InputTodo';
import { ListTodo } from './ListTodo';
import { TTodos } from './type';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<TTodos[]>([]);

  function onChangeState(newState: boolean, ind: number) {
    const todoClone = [...todos];
    todoClone[ind].state = newState;
    setTodos(todoClone);
  }

  function onAddTodoFn(newTodo: string) {
    const newTodoAdded: TTodos = { content: newTodo, state: false };
    setTodos(todos.concat([newTodoAdded]));
  }

  function onDeleteTodo(ind: number) {
    const todoClone = [...todos];
    todoClone.splice(ind, 1);
    setTodos(todoClone);
  }

  function onEditedFn(newTodo: string, ind: number) {
    const todoClone = [...todos];
    todoClone[ind].content = newTodo;
    setTodos(todoClone);
  }

  return (
    <>
      <InputTodo onAddTodo={onAddTodoFn} />
      {
        todos.map((todo, ind) => (
          <ListTodo
            key={`${todo.content}-${ind}`}
            todo={todo}
            onChangeState={(newState) => onChangeState(newState, ind)}
            onDelete={() => onDeleteTodo(ind)}
            onEdited={(todoEdited) => onEditedFn(todoEdited, ind)}
          />
        ))
      }
    </>
  );
};

export { App };