import * as React from "react";

import { app, User } from "firebase";
import { Login } from "./Login";
import { Chat } from "./Chat";

interface Props {
  app: app.App;
}

interface State {
  user: User | null;
}

export class App extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { user: null };
  }

  render() {
    const { user = null } = this.state || {};
    const { app } = this.props;
    return (
      user
        ? <Chat app={app} user={user} />
        : <Login app={app} onLogin={this.onLogin} />
    );
  }

  onLogin = (user: User) => {
    this.setState({
      user,
    });
  }
}
