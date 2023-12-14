import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const GlobalStyle = createGlobalStyle`
${reset}
* {
	box-sizing: border-box;
}
`;

const StContainer = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  width: 100%;
`;

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <StContainer>
        <App />
      </StContainer>
    </QueryClientProvider>
  </Provider>
);
