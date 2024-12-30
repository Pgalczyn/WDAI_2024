import { useState } from "react";

function Licznik() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <div>{counter}</div>
      <button onClick={increment}>Dodaj</button>
    </>
  );
}

export default Licznik;
