import * as React from "react";
import styled from "styled-components";
import * as uuid from "uuid/v4";
import { app, User } from "firebase";

import { MessageType } from "../../../types/MessageType";

const MessageInput = styled.input``;
const MessageSend = styled.button``;

interface SProps {
  user: User;
  app: app.App;
}

abstract class Sender<P, S> extends React.Component<SProps & P, S> {
  async send({ type, data }: {
    type: MessageType;
    data: string
  }) {
    return new Promise((ok, ng) => {
      const { user, app } = this.props;
      app.database().ref("message").push({
        name: user.displayName,
        userId: user.uid,
        type,
        data,
      }, error => {
        if (error) ng(error);
        else ok();
      });
    });
  }
}

interface MSState {
  message: string;
}

export class MessageSender extends Sender<{}, MSState> {
  render() {
    const { message = "" } = this.state || {};
    return (
      <>
        <MessageInput value={message} onChange={this.onMessageChange} />
        <MessageSend onClick={this.onSendClick}>Send</MessageSend>
      </>
    );
  }
  onMessageChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    this.setState({
      message: e.target.value,
    });
  }

  onSendClick = () => {
    const { message = "" } = this.state || {};
    if (!message) {
      return;
    }
    this.send({
      type: "message",
      data: message,
    });
    this.setState({ message: "" });
  }
}

interface ISState {
  files: FileList | null;
}

export class ImageSender extends Sender<{}, ISState> {
  render() {
    return (
      <>
        <input type="file" onChange={this.onFileChange} />
        <button onClick={this.onSendClick}>Send</button>
      </>
    );
  }

  onFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { files } = e.target;
    this.setState({ files });
  }

  onSendClick = async () => {
    const { app } = this.props;
    const { files = null } = this.state || {};
    if (!files || files.length === 0) {
      return;
    }
    const name = uuid();
    await app.storage().ref().child(name).put(files[0]);
    const path = await app.storage().ref().child(name).getDownloadURL();
    this.send({ type: "image", data: path });
    this.setState({ files: null });
  }
}
