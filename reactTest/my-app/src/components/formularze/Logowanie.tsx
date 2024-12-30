import React, { useState } from "react";

function Logowanie() {
  const [tekst, setTekst] = useState({
    original: "",
    repeat: "",
    theSame: false,
    areEmpty: true,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const { value } = e.target;
    setTekst((prevState) => {
      const updatedState = {
        ...prevState,
        [field]: value,
      };

      const theSame = updatedState.original === updatedState.repeat;
      const areEmpty =
        updatedState.original.length == 0 && updatedState.repeat.length == 0;
      return {
        ...updatedState,
        theSame,
        areEmpty,
      };
    });
  };

  return (
    <>
      <label>Nazwa użytkownika: </label>
      <input type="text" />
      <label>Hasło: </label>
      <input
        type="text"
        value={tekst.original}
        onChange={(e) => handleChange(e, "original")}
      />

      <label>Powtórz Hasło: </label>
      <input
        type="text"
        value={tekst.repeat}
        onChange={(e) => handleChange(e, "repeat")}
      />

      <div>
        {tekst.areEmpty ? (
          <button disabled>SUBMIT</button>
        ) : !tekst.theSame ? (
          <button
            onClick={() => {
              alert("Hasła nie są zgodne");
            }}
          >
            SUBMIT
          </button>
        ) : (
          <button
            onClick={() => {
              alert("Zalogowano poprawnie");
            }}
          >
            SUBMIT
          </button>
        )}
      </div>
    </>
  );
}

export default Logowanie;
