import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";
import { Board, Boards, About } from "./pages";
import { Layout } from "./components";
import { BoardsProvider } from "./contexts/BoardsContext";

// TODO: Add Landing page and login/signup pages
function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <AmplifyAuthenticator>
            <BoardsProvider>
              <Route exact={true} path="/boards">
                <Boards />
              </Route>
              <Route path="/board/:id">
                <Board />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route exact={true} path="/">
                <Redirect to="/boards" />
              </Route>

              <AmplifySignUp
                slot="sign-up"
                formFields={[
                  { type: "username" },
                  { type: "password" },
                  { type: "email" },
                ]}
              />
            </BoardsProvider>
          </AmplifyAuthenticator>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
