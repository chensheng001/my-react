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
          let keys = [];
          let reg = pathToRegexp(path,keys, {end: exact});
          keys = keys.map(item => item.name); //[id]
          let result = pathname.match(reg);
          let [url, ...values] = result || []; //[1]
          let props = {
            location: state.location,
            history: state.history,
            match: {
              params: keys.reduce((obj,current,idx) => {
                obj[current] = values[idx];
                return obj;
              }, {})
            }
          };
          if (result) {
            return <Component {...props} />
          }
          return null
        }}
      </Consumer>
    )
  }

}