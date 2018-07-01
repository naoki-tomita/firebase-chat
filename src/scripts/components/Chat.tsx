import * as React from "react";
import styled from "styled-components";
import { app, User } from "firebase";

import { MessageType } from "../types/MessageType";
import { YourMessage, MyMessage } from "./Messsage";
import { MessageSender, ImageSender } from "./Sender";

const Name = styled.div``;

interface Props {
  user: User;
  app: app.App;
}

interface State {
  messages: Array<{
    name: string;
    type: MessageType;
    data: string;
    userId: string;
  }>;
}

const Container = styled.div`
  padding: 20px 10px;
  max-width: 450px;
  margin: 15px auto;
  text-align: right;
  font-size: 14px;
  background: #7da4cd;
`;

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
    const { user, app } = this.props;
    const { messages = [] } = this.state || {};

    return (
      <>
        <Name>{user.displayName}</Name>
        <Container>
          {messages.map(this.renderMessage)}
        </Container>
        <MessageSender app={app} user={user}/>
        <ImageSender app={app} user={user}/>
      </>
    );
  }

  renderMessage = (message: {
    name: string;
    data: string;
    type: MessageType;
    userId: string;
  }, i: number) => {
    if (this.props.user.uid === message.userId) {
      return (
        <MyMessage
          key={i}
          name={message.name}
          type={message.type}
          data={message.data}
        />
      );
    }
    return (
      <YourMessage
        key={i}
        name={message.name}
        type={message.type}
        data={message.data}
      />
    );
  }
}
