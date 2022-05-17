import React, { useState } from "react";
import { Button } from "antd";
import "./counter.scss";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const [counter, setCounter] = useState<number>(0);
  const navigate = useNavigate();
  const handleReset = () => {
    setCounter(0);
  };
  const handleIncrease = () => {
    setCounter(counter + 1);
  };
  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter</h1>
      <div className="counter-value">{counter}</div>
      <div className="counter-buttons">
        <Button type="primary" onClick={handleReset}>
          Reset Counter
        </Button>
        <Button type="primary" onClick={handleIncrease}>
          Increase Counter
        </Button>
      </div>
      <Button type="primary" onClick={() => navigate("/table")}>
        Go to Table page
      </Button>
    </div>
  );
};

export default Counter;
