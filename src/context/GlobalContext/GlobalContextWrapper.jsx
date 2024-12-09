import React, { useState } from "react";
import GlobalContext from "./GlobalContext";

const GlobalContextWrapper = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [name, setName] = useState("");

  return (
    <GlobalContext.Provider value={{
        isShowModal,
        setIsShowModal,
        name,
        setName
    }}>
        {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextWrapper;
