import * as React from 'react';
import { InputTodo } from '../InputTodo';
import { ListTodo } from '../ListTodo';
import { TTodos } from '../type';
import axios from '../helper/axios';
import styles from './app.module.scss';

const App: React.FC = () => {
  const [todos, setTodos] = React.useState<TTodos[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<TTodos[]>('/todos');
        setTodos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function onChangeState(newState: boolean, ind: number) {
    const todoClone = [...todos];
    todoClone[ind].state = newState;
    setTodos(todoClone);
  }

  function onAddTodoFn(newTodo: TTodos) {
    setTodos(todos.concat([newTodo]));
  }

  function onDeleteTodo(ind: number) {
    const todoClone = [...todos];
    todoClone.splice(ind, 1);
    setTodos(todoClone);
  }

  function onEditedFn(newTodo: TTodos, ind: number) {
    const todoClone = [...todos];
    todoClone[ind] = newTodo;
    setTodos(todoClone);
  }

  return (
    <>
      <InputTodo onAddTodo={onAddTodoFn} />
      { loading ? <>Loading..</> : (
        <>
          {
            todos.map((todo, ind) => (
              <div className={styles.flex}>
                <ListTodo
                  key={`${todo.content}-${ind}`}
                  todo={todo}
                  onChangeState={(newState) => onChangeState(newState, ind)}
                  onDelete={() => onDeleteTodo(ind)}
                  onEdited={(todoEdited) => onEditedFn(todoEdited, ind)}
                />
              </div>
            ))
          }
        </>
      ) }
    </>
  );
};

export { App };