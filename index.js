import React from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import { Presentational } from "./reactStuff"
import { store, mapStateToProps, mapDispatchToProps } from "./reduxStuff";

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

const Wrapper = () => (
  <Provider store={store}>
    <Container/>
  </Provider>
)

ReactDOM.render(<Wrapper/>, document.getElementById("root"));