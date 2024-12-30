import { useState } from "react";
import Przycisk from "./przycisk";

function NowyLicznik() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <div>{counter}</div>
      <Przycisk onIncrement={increment}></Przycisk>
    </>
  );
}

export default NowyLicznik;
