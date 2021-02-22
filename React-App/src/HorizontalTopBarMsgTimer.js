import React, { useState, useEffect, useRef } from "react";
//import ReactDOM from "react-dom";

const HorizontalTopBarMsgTimer = props => {
  const [counter, setCounter] = useState(props.msgBarTimer.counter);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(props.timerOn);
  const [counterLimit, setCounterLimit] = useState(2);


useEffect(() => {
  setCounterLimit(2)
  setDelay(1000)
  setIsRunning (props.timerOn) 
  setCounter(props.msgBarTimer.counter)
}, [props.timerOn, props.msgBarTimer.counter]);

  useInterval(() => {
    setCounter(counter + 1);
    if (counter >= counterLimit) {
      setIsRunning (false)
      setCounter(0)
      props.setMsgBarTimer({visibleMsgBar : false, msgText: ""})
      props.setTimerOn (false)
    }
  }, isRunning ? delay : null);

  //function handleDelayChange(e) {
  //  setDelay(Number(e.target.value));
  //}

  //function handleIsRunningChange(e) {
  //  setIsRunning(e.target.checked);
  //  if (isRunning === false) {
  //    setCounter(1)
  //  }
  //}

  return (
    <div style={{display:'none'}}>
      counterer : {counter}
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
//ReactDOM.render(<counterer />, rootElement);
