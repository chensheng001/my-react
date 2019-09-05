import React, {Component} from 'react';

class UserAdd extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let inputValue = this.refs.input.value;
    this.props.history.push('/user/list');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref='input' type={'text'}/>
        <button type={'submit'}>提交</button>
      </form>
    );
  }
}

export default UserAdd;