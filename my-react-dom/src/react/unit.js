import $ from 'jquery';

class Unit {
  // 通过父类传递参数
  constructor(element) {
    this.currentElement = element;
  }
}

class ReactTextUnit extends Unit {
  getMarkUp(rootId) {//保存当前元素的id
    this._rootId = rootId;
    // 返回当前元素对应的html脚本
    let markUp = `<span data-reactid="${rootId}">${this.currentElement}</span>`;
    return markUp;
  }
}

class ReactNativeUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId;
    // 拼接 渲染的内容
    let {type, props} = this.currentElement;
    let tagStart = `<${type} data-reactid='${rootId}'`;
    let tagEnd = `</${type}`;
    let contentStr;
    for (let propName in props) {
      if (/on[A-Z]/.test(propName)) {
        let eventType = propName.slice(2).toLowerCase(); // 截取click
        // react 里面的事件都是通过事件委托来绑定
        $(document).on(eventType, `[data-reactid='${rootId}']`,props[propName]);
      }else if (propName === 'children') {// ['<span>你好</span>', '<button>123</button>']
        contentStr = props[propName].map((child, idx) => {
          // 递归循环子节点
          let childInstance = createReactUnit(child);
          // 返回的是多个元素的字符串的数组
          return childInstance.getMarkUp(`${rootId}.${idx}`)
        }).join('')
      }else {
        tagStart += (`${propName}=${props[propName]}`)
      }
    }
    // 返回拼接后的字符串
    return tagStart + '>' + contentStr + tagEnd;
  }
}

class ReactCompositUnit extends Unit{
  getMarkUp(rootId) {
    this._rootId = rootId;
    let {type:Component,props} = this.currentElement;
    let componentInstance = new Component(props);
    //调用生命周期方法
    componentInstance.componentWillMount && componentInstance.componentWillMount();
    // 调用render后返回的结果
    let reactComponentRenderer = componentInstance.render();
    // 递归渲染
    let reactCompositUnitInstance = createReactUnit(reactComponentRenderer);
    // 实现把render方法返回的结果作为字符串返还回去
    let markUp = reactCompositUnitInstance.getMarkUp(rootId);
    // 在递归后绑定的事件，子组件先完成
    // 先序深度遍历 树的遍历
    $(document).on('mounted', () => {
      componentInstance.componentDidMount && componentInstance.componentDidMount();
    });
    return markUp;
  }
}

function createReactUnit(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new ReactTextUnit(element);
  }
  if (typeof element === 'object' && typeof element.type === 'string') {
    return new ReactNativeUnit(element);
  }
  if (typeof element === 'object' && typeof element.type === 'function') {
    return new ReactCompositUnit(element);
  }
}
export default createReactUnit;