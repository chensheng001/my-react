import React, {Component} from 'react';
import {Consumer} from "./context";
import pathToRegexp from "path-to-regexp";

// switch 作用 匹配一个组件
class Switch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Consumer>
        {state => {
          let pathname =state.location.pathname;
          let children = this.props.children;
          for (let i = 0; i< children.length; i++){
            let child = children[i];
            let path = child.props.path || '';
            let reg =pathToRegexp(path,[],{end: false});
            // switch匹配成功
            if (reg.test(pathname)) {
              return child; //把匹配到的组件返回
            }
          }
          return null;
        }}
      </Consumer>
    );
  }
}

export default Switch;