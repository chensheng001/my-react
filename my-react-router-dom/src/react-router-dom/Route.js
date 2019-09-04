import React,{Component} from 'react';
import {Consumer} from './context';
import pathToRegexp from "path-to-regexp";

export default class Route extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Consumer>
        {(state) =>{
          // path 是route中传递的
          let {path, component: Component, exact = false} = this.props;

          // pathname是location中的
          let pathname = state.location.pathname;
          // 根据path实现一个正则 通过正则匹配
          let reg = pathToRegexp(path,[], {end: exact});
          let result = pathname.match(reg);
          if (result) {
            return <Component/>
          }
          return null
        }}
      </Consumer>
    )
  }

}