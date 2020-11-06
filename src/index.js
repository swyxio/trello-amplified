import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import Amplify from "aws-amplify";

import awsExports from "./aws-exports";
import { DataStore } from '@aws-amplify/datastore'
import { Hub } from 'aws-amplify';
Amplify.configure(awsExports);
Hub.listen('auth', async (data) => {
  if (data.payload.event === 'signOut') {
    await DataStore.clear();
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
