import * as React from "react";
import styled from "styled-components";
import * as uuid from "uuid/v4";
import { app, User } from "firebase";

import { MessageType } from "../types/MessageType";

const MessageSenderContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 450px;
  width: 100%;
  height: 48px;
  background-color: #AAA;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageInput = styled.input`
  border-radius: 100px;
  margin: 5px;
  flex: 1;
  border: none;
  font-size: 16px;
  transform: scale(14/16);
`;

const MessageSend = styled.a`
  position: relative;
  display: inline-block;
  padding: 0 0 0 8px;
  color: #000;
  vertical-align: middle;
  text-decoration: none;
  font-size: 45px;
  width: 36px;
  height: 36px;
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    content: "";
    vertical-align: middle;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #7a0;
  }
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    content: "";
    vertical-align: middle;
    left: 9px;
    width: 9px;
    height: 9px;
    border-top: 3px solid #fff;
    border-right: 3px solid #fff;
    transform: rotate(45deg);
  }
`;

interface SProps {
  user: User;
  app: app.App;
}

abstract class Sender<P, S> extends React.Component<SProps & P, S> {
  async send({ type, data }: {
    type: MessageType;
    data: string
  }) {
    const { user, app } = this.props;
    app.database().ref("message").push({
      name: user.displayName,
      userId: user.uid,
      type,
      data,
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
      <MessageSenderContainer>
        <ImageSender {...this.props}/>
        <MessageInput value={message} onChange={this.onMessageChange} />
        <MessageSend onClick={this.onSendClick}></MessageSend>
      </MessageSenderContainer>
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

const FileUploadButton = styled.label``;

const FileUploadButtonInner1 = styled.span`
  height:40px;
  width:40px;
  display:block;
  position:relative;
  height:35px;
  &::before {
    content: '';
    height: 13px;
    width: 4px;
    display: block;
    background: #333;
    position: absolute;
    top: 0;
    left: 18px;
  }
  &::after {
    content:'';
    height:0;
    width:0;
    display: block;
    border: transparent solid;
    border-width: 15px 9px 0 9px;
    border-top-color: #333;
    position: absolute;
    top: 13px;
    left: 11px;
  }
`;

const FileUploadButtonInner2 = styled.span`
  height: 40px;
  width: 40px;
  display: block;
  position: relative;
  height: 35px;
  &::before {
    content: '';
    height: 5px;
    width: 30px;
    display: block;
    border: 5px #333 solid;
    border-top-width: 0;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
`;

export class ImageSender extends Sender<{}, ISState> {
  render() {
    return (
      <>
        <FileUploadButton htmlFor="upload">
          <FileUploadButtonInner1>
            <FileUploadButtonInner2/>
          </FileUploadButtonInner1>
          <input style={{ display: "none" }} id="upload" type="file" onChange={this.onFileChange} />
        </FileUploadButton>
      </>
    );
  }

  onFileChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
    const { files } = e.target;
    const { app } = this.props;
    if (!files || files.length === 0) {
      return;
    }
    const name = uuid();
    await app.storage().ref().child(name).put(files[0]);
    const path = await app.storage().ref().child(name).getDownloadURL();
    this.send({ type: "image", data: path });
  }
}
