import React from "react";
import { Route } from "react-router-dom";

export default function AppliedRoute({ component: C, appProps}) {
  return (
    <Route render={props => <C {...props} {...appProps} />} />
  );
}