

/*------count 的发布订阅者实践------*/

const createStore = (initState,reducer) => {
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
function counterReducer(state, action) {
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

function InfoReducer(state, action) {
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


let store = createStore(initState, reducer);
store.subscribe(() => {
  let state = store.getState();
  console.log(state);
});

store.dispatch({type: 'SET_NAME', name: '哈哈'});
store.dispatch({type: 'increment'});

