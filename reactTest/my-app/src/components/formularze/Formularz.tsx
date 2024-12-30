import React, { useState } from "react";

function Form() {
  const [tekst, setTekst] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTekst(e.target.value);
  };

  return (
    <>
      <input type="text" value={tekst} onChange={handleChange} />
      <div>{tekst}</div>
    </>
  );
}

export default Form;
