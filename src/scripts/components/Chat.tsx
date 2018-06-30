import * as React from "react";

import { app, User } from "firebase";
import styled from "styled-components";

const MyMessage = (props: {
  name: string;
  message: string;
}) => {
  return (
    <>
      <div>{props.name}</div>
      <div>{props.message}</div>
    </>
  );
}

const Message = (props: {
  name: string;
  message: string;
}) => {
  return (
    <>
      <div>{props.name}</div>
      <div>{props.message}</div>
    </>
  );
}

interface Props {
  user: User;
  app: app.App;
}

interface State {
  messages: Array<{
    name: string;
    message: string;
    userId: string;
  }>;
  message: string;
}

const Name = styled.div``;
const MessageInput = styled.input``;
const MessageSend = styled.button``;

export class Chat extends React.Component<Props, State> {
  componentDidMount() {
    const { app } = this.props;
    const db = app.database();
    db.ref("message").on("value", data => {
      if (data) {
        const messages: any[] = [];
        data.forEach(item => {
          messages.push(item.val());
        });
        this.setState({ messages });
      }
    })
  }

  render() {
    const { user } = this.props;
    const { messages = [], message = "" } = this.state || {};

    return (
      <>
        <Name>{user.displayName}</Name>
        {messages.map(this.renderMessage)}
        <MessageInput value={message} onChange={this.onMessageChange} />
        <MessageSend onClick={this.onSendClick}>Send</MessageSend>
      </>
    );
  }

  renderMessage = (message: {
    name: string;
    message: string;
    userId: string;
  }, i: number) => {
    if (this.props.user.uid === message.userId) {
      return <MyMessage key={i} name={message.name} message={message.message} />
    }
    return <Message key={i} name={message.name} message={message.message} />
  }

  onMessageChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      message: e.target.value,
    });
  }

  onSendClick = () => {
    const { user } = this.props;
    const { message = "" } = this.state || {};
    if (!message) {
      return;
    }
    this.props.app.database().ref("message").push({
      name: user.displayName,
      userId: user.uid,
      message,
    });
    this.setState({
      message: "",
    });
  }
}
