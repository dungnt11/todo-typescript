import * as React from 'react';
import { TTodos } from './type';
import axios from './helper/axios';

type TProps = {
  todo: TTodos,
  onChangeState: (newState: boolean) => void,
  onDelete: () => void,
  onEdited: (newTodo: TTodos) => void,
}

const ListTodo: React.FC<TProps> = ({ todo, onChangeState, onDelete, onEdited }) => {
  const handlePromise = React.useCallback(async (fn: () => Promise<void>) => {
    try {
      setLoading(true);
      await fn();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [editTemp, setEditTemp] = React.useState<string>('');

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  function showEditer() {
    setEditTemp(todo.content);
    toggleEdit();
  }

  async function onChangeStateFn(event: React.ChangeEvent<HTMLInputElement>) {
    const newState = event.target.checked;

    await handlePromise(async () => {
      const { data } = await axios.put<TTodos>(`/todos/${todo.id}`, {
        content: todo.content,
        state: newState,
      });
      onChangeState(data.state);
    });
  }

  function setEditTempFn(event: React.ChangeEvent<HTMLInputElement>) {
    setEditTemp(event.target.value);
  }

  async function onEditedFn() {
    await handlePromise(async () => {
      const { data } = await axios.put<TTodos>(`/todos/${todo.id}`, {
        content: editTemp,
        state: false,
      });
      onEdited(data);
      setEditTemp('');
      toggleEdit();
    });
  }

  async function onDeleteFn() {
    await handlePromise(async () => {
      await axios.delete<TTodos>(`/todos/${todo.id}`);
      onDelete();
    });
  }
  
  return (
    <>
      { isEdit ? (
        <>
          <input
            type="text"
            value={editTemp}
            onChange={setEditTempFn}
          />
          <button type="button" onClick={onEditedFn}>
            { loading ? <>Loading...</> : 'Save' }
          </button>
        </>
      ) : (
        <div onClick={showEditer}>{ todo.content }</div>
      ) }
      <div onClick={onDeleteFn}>x</div>
      <input
        type="checkbox"
        checked={todo.state}
        onChange={onChangeStateFn}
      />
    </>
  );
};

export { ListTodo };