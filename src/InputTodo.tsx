import * as React from 'react';
import axios from './helper/axios';
import { TTodos } from './type';

type TProps = { onAddTodo: (todo: TTodos) => void };

type TState = {
  input: string,
  loading: boolean,
};

class InputTodo extends React.Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = { input: '', loading: false };
  }

  setInput(input: string) {
    this.setState({ input });
  }

  async onAddTodoFn() {
    try {
      const { input } = this.state;
      this.setState({ loading: true });
      const { data } = await axios.post<TTodos>('/todos', {
        content: input,
        state: false,
      });
      this.props.onAddTodo(data);
      this.setInput('');
    } catch (error) {
      
    } finally {
      this.setState({ loading: false });
    }
  }

  onChangeFn(event: React.ChangeEvent<HTMLInputElement>) {
    this.setInput(event.target.value);
  }

  render() {
    const { input, loading } = this.state;
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
          {loading ? <>Loading..</> : 'Add'}
        </button>
      </>
    )
  }
}

export { InputTodo };