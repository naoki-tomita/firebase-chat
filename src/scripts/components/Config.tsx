import * as React from "react";
import styled from "styled-components";
import { app, User } from "firebase";
import { Spinner } from "./Spinner";

interface Props {
  app: app.App;
  user: User;
}

interface State {
  name: string;
  user: User | null;
}

const Input = styled.input``;
const ChangeButton = styled.button``;

export class Config extends React.Component<Props, State> {
  constructor(p: Props, c: any) {
    super(p, c);
    this.state = { name: "", user: null };
  }

  render() {
    const { name = "", user = null } = this.state || {};
    if (!user) {
      return <Spinner />
    } else {
      return (
        <>
          <Input value={name} onChange={this.onNameChange} />
          <ChangeButton onClick={this.onChangeClick} >Login</ChangeButton>
        </>
      );
    }
  }

  onNameChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeClick = async () => {
    const { name = "", user = null } = this.state || {};
    if (user && name) {
      await user.updateProfile({
        displayName: name,
        photoURL: "http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/User-icon.png",
      });
    }
  }
}
