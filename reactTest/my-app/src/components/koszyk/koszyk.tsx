import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Basket(props: Props) {
  return <div>{props.children}</div>;
}

export default Basket;
