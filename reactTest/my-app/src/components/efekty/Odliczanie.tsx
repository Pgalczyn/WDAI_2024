import { useEffect, useState, useRef } from "react";

function Odliczanie() {
  const [licznik, setLicznik] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [buttonText, setButtonText] = useState("START");

  const intervalID = useRef<number | null>(null);

  const onClick = () => {
    setIsActive((prev) => {
      const newIsActive = !prev;
      setButtonText(newIsActive ? "STOP" : "START");
      return newIsActive;
    });
  };

  useEffect(() => {
    if (isActive) {
      intervalID.current = window.setInterval(() => {
        setLicznik((prevLicznik) => {
          if (prevLicznik <= 0.1) {
            clearInterval(intervalID.current!);
            setButtonText("Odliczanie zakończone");
            return 0;
          }
          return prevLicznik - 0.1;
        });
      }, 100);
    } else {
      if (intervalID.current) {
        clearInterval(intervalID.current);
        intervalID.current = null;
      }
    }

    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current);
      }
    };
  }, [isActive]);

  return (
    <>
      <div>{licznik.toFixed(1)}</div>
      <button onClick={onClick}>{buttonText}</button>
    </>
  );
}

export default Odliczanie;
