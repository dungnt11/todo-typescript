import * as React from 'react';

type TProps = { onAddTodo: (todo: string) => void };

type TState = {
  input: string,
};

class InputTodo extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = { input: '' };
  }

  setInput(input: string) {
    this.setState({ input });
  }

  onAddTodoFn() {
    const { input } = this.state;
    this.props.onAddTodo(input);
    this.setInput('');
  }

  onChangeFn(event: React.ChangeEvent<HTMLInputElement>) {
    this.setInput(event.target.value);
  }

  render() {
    const { input } = this.state;
    return (
      <>
        <input
          type="text"
          value={input}
          onChange={this.onChangeFn.bind(this)}
        />

        <button
          type="button"
          onClick={() => this.onAddTodoFn()}
        >
          Add
        </button>
      </>
    )
  }
}

export { InputTodo };