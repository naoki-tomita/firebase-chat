import * as React from "react";
import { User, app } from "firebase";
import { MessageSender, ImageSender } from "./Sender";

interface Props {
  user: User;
  app: app.App;
}

export const Footer: React.StatelessComponent<Props> = ({ app, user }) => {
  return (
    <>
      <MessageSender app={app} user={user}/>
      <ImageSender app={app} user={user}/>
    </>
  );
}