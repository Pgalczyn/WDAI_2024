function Ternary() {
  let a = true;
  let b = false;

  return (
    <>
      {a ? (
        <p>Stwierdzenie a jest prawdziwe</p>
      ) : (
        <p>Stwierdzenie a jest fałszywe</p>
      )}{" "}
      {b ? (
        <p>Stwierdzenie b jest prawdziwe</p>
      ) : (
        <p>Stwierdzenie b jest fałszywe</p>
      )}
    </>
  );
}

export default Ternary;
