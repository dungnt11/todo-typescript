import * as React from 'react';
import { TTodos } from './type';

type TProps = {
  todo: TTodos,
  onChangeState: (newState: boolean) => void,
  onDelete: () => void,
  onEdited: (newTodo: string) => void,
}

const ListTodo: React.FC<TProps> = ({ todo, onChangeState, onDelete, onEdited }) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [editTemp, setEditTemp] = React.useState<string>('');

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  function showEditer() {
    setEditTemp(todo.content);
    toggleEdit();
  }

  function onChangeStateFn(event: React.ChangeEvent<HTMLInputElement>) {
    onChangeState(event.target.checked);
  }

  function setEditTempFn(event: React.ChangeEvent<HTMLInputElement>) {
    setEditTemp(event.target.value);
  }

  function onEditedFn() {
    onEdited(editTemp);
    setEditTemp('');
    toggleEdit();
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
          <button type="button" onClick={onEditedFn}>Save</button>
        </>
      ) : (
        <div onClick={showEditer}>{ todo.content }</div>
      ) }
      <div onClick={onDelete}>x</div>
      <input
        type="checkbox"
        checked={todo.state}
        onChange={onChangeStateFn}
      />
    </>
  );
};

export { ListTodo };