import {createStore, applyMiddleware} from "redux";
import {logger} from "redux-logger";
import modifyTable from "./Reducers/modifyTable";
export const store=createStore(modifyTable,applyMiddleware(logger));