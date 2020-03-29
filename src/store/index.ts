import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagas } from "./sagas";

let store = null;

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(sagas);
  return store;
}
