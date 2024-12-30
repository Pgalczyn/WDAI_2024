import { useState } from "react";

function Aktualizacja() {
  const [product, setProduct] = useState({ nazwa: "Pomidor", cena: 50 });

  const onClick = () => {
    setProduct((prevState) => ({
      ...prevState,
      cena: 100,
    }));
  };

  return (
    <>
      <div>
        <p>{product.nazwa + " " + product.cena}</p>
        <button onClick={onClick}>zmienCene</button>
      </div>
    </>
  );
}

export default Aktualizacja;
