import Product from "./produkt";

const Produkty = ["jabłko", "gruszka", "bananaada", "śliwka", "pomarańcz"];

function BasketNew() {
  return (
    <div>
      {Produkty.map((prod, index) => (
        <Product key={index} nazwa={prod} />
      ))}
    </div>
  );
}

export default BasketNew;
