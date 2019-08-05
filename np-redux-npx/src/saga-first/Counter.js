/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
      <div>
        <button onClick={onIncrementAsync}>Increment every 1s</button>{' '}
        <button onClick={onIncrement}>Increment</button>{' '}
        <button onClick={onDecrement}>Decrement</button> <hr />
        <div>Clicked: {value} times</div>
      </div>

export default Counter
