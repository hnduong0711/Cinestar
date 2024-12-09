import React from "react"

const GlobalContext = React.createContext({
    isShowModal: false,
    setIsShowModal: () => {},
    name: "",
    setName: () => {}
});

export default GlobalContext;