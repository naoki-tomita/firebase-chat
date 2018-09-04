import * as React from "react";
import styled from "styled-components";

import { app, User } from "firebase";
import { Login } from "./Login";
import { Chat } from "./Chat";

interface Props {
  app: app.App;
}

interface State {
  user: User | null;
}

const Container = styled.div`
  padding: 20px 10px;
  max-width: 450px;
  margin: 15px auto;
  text-align: right;
  font-size: 14px;
  background: #7da4cd;
`;

/**
 * manage app status.
 * login, chat, config(not implemented).
 */
export class App extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { user: null };
  }

  render() {
    return (
      <Container>
        {this.renderContent()}
      </Container>
    );
  }

  renderContent() {
    const { user } = this.state;
    const { app } = this.props;
    return user
      ? <Chat app={app} user={user} />
      : <Login app={app} onLogin={this.onLogin} />;
  }

  onLogin = (user: User) => {
    this.setState({
      user,
    });
  }
}
