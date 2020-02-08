import React from "react";
import { hot } from "react-hot-loader/root"
import "./App.css";
import NewsTable from "./components/NewsTable";

const App = () => {
    return(
        <div className="App">
            <NewsTable />
        </div>
    );
};

export default hot(App);