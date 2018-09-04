import * as React from "react";
import { app, User } from "firebase";

import { SomeoneMessage, MyMessage } from "../Messsage";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Message } from "../../types/Message";

interface Props {
  user: User;
  app: app.App;
}

interface State {
  messages: Message[];
}


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
        <Header userName={user.displayName || "anonymous"}/>
          {messages.map(this.renderMessage)}
        <Footer app={app} user={user} />
      </>
    );
  }

  renderMessage = (message: Message, i: number) => {
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
      <SomeoneMessage
        key={i}
        name={message.name}
        type={message.type}
        data={message.data}
      />
    );
  }
}
