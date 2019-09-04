import $ from 'jquery';
import createReactUnit from './unit.js';
import createElement from './element';
import Component from './component'
let React = {
  render,
  nextRootIndex: 0,
  createElement,
  Component
};
//给每个元素添加一个属性，为了方便获取到这个元素
function render(element,container) {
  // 写一个工厂函数 来创建对应的react元素
  // 通过这个工厂函数来创建
  let createReactUnitInstance = createReactUnit(element);
  let markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex);
  $(container).html(markUp);

  // 触发 挂载完成的方法
  $(document).trigger('mounted'); //所有组件都完成
}
export default React;