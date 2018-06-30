import * as React from "react";
import styled from "styled-components";
import { app, User } from "firebase";
import { Spinner } from "./Spinner";

interface Props {
  app: app.App;
  onLogin: (user: User) => void;
}

interface State {
  name: string;
  user: User | null;
}

const Input = styled.input``;
const LoginButton = styled.button``;

export class Login extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { name: "", user: null };
  }
  componentDidMount() {
    const { app } = this.props;
    app.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.displayName) {
          this.props.onLogin(user);
        } else {
          this.setState({ user });
        }
      }
    });
    this.login();
  }

  render() {
    const { name = "", user = null } = this.state || {};
    if (!user) {
      return <Spinner />
    } else {
      return (
        <>
          <Input value={name} onChange={this.onNameChange} />
          <LoginButton onClick={this.onLoginClick} >Login</LoginButton>
        </>
      );
    }
  }

  async login() {
    const { app } = this.props;
    app.auth().signInAnonymously();
  }

  onNameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      name: e.target.value,
    });
  }

  onLoginClick = async () => {
    const { name = "", user = null } = this.state || {};
    if (user && name) {
      await user.updateProfile({
        displayName: name,
        photoURL: null,
      });
      this.props.onLogin(user);
    }
  }
}
