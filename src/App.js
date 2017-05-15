import React,{Component} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
const state1={
  counter:0,
  message:'name or character'
}
const state2={
  counter:0,
  message:'palindrome or not'
};
function reducerA(state = state1,action){
  console.log(action.data);
  switch (action.type) {
    case 'Number':
    console.log("numberrr");
    if(!isNaN(action.data)){console.log("numberrr1");
      let counter = 0;
      let message ="its a number";
      console.log(message);
      return {...state,counter,message};
    }
    case 'Name':if(isNaN(action.data)){
      let counter =state.counter;
       counter = counter + 1;
      let message = "its a name"
      return {...state,counter,message};
    }
     default: return state;
  }
}
function reducerB(state = state2, action) {
  switch (action.type) {
  case 'PalindromeName':
  if(palindrome(action.data) == 1){
    let counter =state.counter;
     counter = counter+1;
    let message ='palindrome string'
    return {...state,counter,message};
  }
  case 'PalindromeNumber':
  if(checkPalindrome(action.data) == 1){
    let counter = 0;
    let message ='palindrome number'
    return {...state,counter,message}
  }
  default:
    return state
  }
}
function palindrome(content){
  var removeChar = content.replace(/[^A-Z0-9]/ig, "").toLowerCase();
  var checkPalindrome = removeChar.split('').reverse().join('');
  if(removeChar === checkPalindrome){
  return 1;
  }
  else{
  return 0;
}
}
function checkPalindrome(content1) {
var revStr = "";
var i = content1.length;
for(var j=i; j>=0; j--) {
revStr = revStr+str.charAt(j);
}
if(content1 == revStr) {
return 1;
} else {
  return 0;
}
}
const reducer=combineReducers({
  charTest:reducerA,
  palindromeTest:reducerB
});
const logger =store => next =>action =>{
  console.log("enter");
  console.log(' was fired',action.type);
  next(action);
};

const asyncaction = (store) => (next) => (action)=>{
if(typeof action == 'function'){
  action.store(dispatch);
}
else {
  next(action);
}
};

const asyncaction1 = () =>{
  return(dispatch) =>{
    fetch('http://rest.learncode.academy/api/ttn/users')
    .then(response => response.json()).then(data => {
      console.log(data);
      dispatch({type:'Name',data:data.name})
    });
  }
}

const middlewares = applyMiddleware(logger,asyncaction1);
const store = createStore(reducer,middlewares);
store.subscribe(() =>
  console.log("store updated", store.getState())
)
store.dispatch({ type: 'Number',data:123});
store.dispatch({type:'Name',data:'prachik'})
store.dispatch({type:'PalindromeName',data:'pppppp'})
store.dispatch({type:'PalindromeNumber',data:12321})
