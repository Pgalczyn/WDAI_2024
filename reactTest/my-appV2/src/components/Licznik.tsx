import { useEffect, useState } from "react";

function Licznik() {
  const [counter, setCounter] = useState<number>(() => {
    const value = localStorage.getItem("counterValue");
    return value ? parseInt(value) : 0;
  });

  const increment = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    localStorage.setItem("counterValue", counter.toString());
  }, [counter]);
  return (
    <>
      <div>{counter}</div>
      <button onClick={increment}>Dodaj</button>
    </>
  );
}

export default Licznik;
