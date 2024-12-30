interface props {
  onIncrement: () => void;
}

function Przycisk({ onIncrement }: props) {
  return (
    <div>
      <button onClick={onIncrement}>Dodaj</button>
    </div>
  );
}

export default Przycisk;
