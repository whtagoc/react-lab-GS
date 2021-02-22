import React, { useState, useEffect, useRef } from "react";
//import ReactDOM from "react-dom";

const HorizontalTopBarMsgTimer = props => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(props.timerOn);
  const [countLimit, setCountLimit] = useState(3);

useEffect(() => {
  setIsRunning (props.timerOn) 
  setCount(0)
}, [props.timerOn]);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
    if (count >= countLimit) {
      setIsRunning (false)
      props.setVisibleMsgBar(false)

    }
  }, isRunning ? delay : null);

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function handleIsRunningChange(e) {
    setIsRunning(e.target.checked);
    if (isRunning === false) {
      setCount(1)
    }
  }

  return (
    <div style={{display:'none'}}>
      Counter : {count}
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default HorizontalTopBarMsgTimer
//const rootElement = document.getElementById("root");
//ReactDOM.render(<Counter />, rootElement);
