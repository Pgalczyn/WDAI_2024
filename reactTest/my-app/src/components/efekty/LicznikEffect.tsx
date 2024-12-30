import { useEffect, useState } from "react";

function LicznikEffect() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };
  useEffect(() => {
    console.log("Hello World");
  }, []);
  useEffect(() => {
    console.log("licznik zwiększył się do " + counter);
  }, [counter]);

  return (
    <>
      <div>{counter}</div>
      <button onClick={increment}>Dodaj</button>
    </>
  );
}

export default LicznikEffect;
