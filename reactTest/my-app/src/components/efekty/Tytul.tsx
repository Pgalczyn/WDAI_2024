import React, { useEffect, useState } from "react";

function Title() {
  const [title, setTitle] = useState("");

  const changeHandleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTitle(value);
  };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <input
      type="text"
      value={title}
      onChange={(e) => {
        changeHandleEvent(e);
      }}
    />
  );
}

export default Title;
