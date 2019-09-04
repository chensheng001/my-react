import React, {Component} from 'react';
import {Consumer} from "./context";

export default class Redirect extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Consumer>
        {state => {
          // 重定向就是匹配不到后直接跳转到redirect 中 to 的路径
          state.history.push(this.props.to);
          return null;
        }}
      </Consumer>
    )
  }

}