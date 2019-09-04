import React from './react';

function event () {
  alert(0)
}
//jsx语法 =》 虚拟dom对象 类
let ele = React.createElement("div", {
  name: "xxx"
}, "hello ", React.createElement("button", {onClick: event}, "123"));

class SubCounter {

  componentWillMount() {
    console.log('子组件 即将挂载')
  }

  componentDidMount() {
    console.log('子组件 挂载完成')
  }

  render() {
    console.log('render 子组件')
    return 'sub counter'
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {number:1}
  }

  componentWillMount() {
    console.log('父组件 即将挂载')
  }

  componentDidMount() {
    console.log('父组件 挂载完成')
  }

  render() {
    console.log('render 父组件')
    return (
      React.createElement(SubCounter, {name: 'sub'})
    )
  }
}

React.render(React.createElement(Counter, {name: 'zf'}),document.getElementById('root'));