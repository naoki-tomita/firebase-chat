import * as React from "react";
import styled from "styled-components";
import { app, User } from "firebase";

import { MessageType } from "../types/MessageType";
import { YourMessage, MyMessage } from "./Messsage";
import { MessageSender } from "./Sender";

const Name = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 450px;
  width: 100%;
  height: 32px;
  background-color: #AAA;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
`;

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
  max-width: 450px;
  font-size: 14px;
  margin: auto;
`;

const MessageContainer = styled.div`
  min-height: 100%;
  text-align: right;
  background: #7da4cd;
  padding: 38px 4px 48px 4px;
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
      <Container>
        <Name>{user.displayName}</Name>
        <MessageContainer>
          {messages.map(this.renderMessage)}
        </MessageContainer>
        <MessageSender app={app} user={user}/>
      </Container>
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
