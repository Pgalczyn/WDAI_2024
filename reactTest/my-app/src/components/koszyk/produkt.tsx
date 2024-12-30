interface Props {
  nazwa: string;
}

function Product(props: Props) {
  return <div>{props.nazwa}</div>;
}

export default Product;
