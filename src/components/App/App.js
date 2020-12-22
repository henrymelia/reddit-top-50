import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../Layout/Layout";
import { store, persistor } from "../../store";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout />
    </PersistGate>
  </Provider>
);

export default App;
