import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/root-reducer";

const store = createStore(rootReducer);

const App = () => <Provider store={store}>Reddit Top 50</Provider>;

export default App;
