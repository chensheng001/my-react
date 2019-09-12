

/*------count 的发布订阅者实践------*/

const createStore = (reducer,initState) => {
  let state = initState;
  let listeners = [];

  /*订阅*/
  function subscribe(lisner) {
    listeners.push(lisner);
  }

  function dispatch(action) {
    state = reducer(state,action);
    /*当 count 改变的时候，我们要去通知所有的订阅者*/
    for (let i = 0; i< listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
  dispatch({ type: Symbol() })

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  }

};

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    description: ''
  }
};

/*store.dispatch({
  ...store.getState(),
  info: {
    name: '嘿嘿',
    description: '我是redux'
  }
});

store.dispatch({
  ...store.getState(),
  counter: {
    count: 2,
  }
});*/

/*自增*/
/*store.dispatch({
  ...store.getState(),
  counter: {
    count: store.getState().counter.count + 1
  }
});*/

/*plan 函数*/
let initCountState = {
  count: 0
};
function counterReducer(state, action) {
  if (!state) {
    state = initCountState;
  }
  switch(action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count+1
      };
    case 'decrement':
      return {
        ...state,
        count: state.count-1
      };
    default:
      return state;
  }
}

let initInfoState = {
  name: '',
  description: ''
};
function InfoReducer(state, action) {
  if (!state) {
    state = initInfoState;
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

function combineReducer(reducers) {
  /* reducerKeys = ['counter', 'info']*/
  const reducerKeys = Object.keys(reducers)

  /*返回合并后的新的reducer函数*/
  return function combination(state = {}, action) {
    /*生成的新的state*/
    const nextState = {}

    /*遍历执行所有的reducers，整合成为一个新的state*/
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      /*之前的 key 的 state*/
      const previousStateForKey = state[key];
      /*执行 分 reducer，获得新的state*/
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey
    }
    return nextState;
  }
}

const reducer = combineReducer({
  counter: counterReducer,
  info: InfoReducer
});


let store = createStore(reducer);
store.subscribe(() => {
  let state = store.getState();
});

const next = store.dispatch;

/*重写了store.dispatch, 记录日志*/

store.dispatch = action => {
  try {
    console.log('this state', store.getState());
    console.log('action', action);
    next(action);
    console.log('next state', store.getState());
  } catch (err) {
    console.log(err)
  }
}

store.dispatch({type: 'increment'});

let test = (number) => ({a1: number+1,a2: number+2});
console.log(test(1));


