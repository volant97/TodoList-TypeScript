import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

function App() {
  return (
    <>
      <GlobalStyle />
      <h1>세팅 끝!</h1>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
${reset}
* {
	box-sizing: border-box;
}
`;
