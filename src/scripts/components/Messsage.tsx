import * as React from "react";
import styled from "styled-components";

import { MessageType } from "../types/MessageType";

interface Message {
  (props: {
    name: string;
    type: MessageType;
    data: string;
  }): JSX.Element;
}

const MyContainer = styled.div`
  padding: 10px 0;

  &:first-child {
    padding-top: 32px;
  }
  &:last-child {
    padding-bottom: 48px;
  }
`;

const MyText = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    right: -19px;
    border: 8px solid transparent;
    border-left: 18px solid #30e852;
    -ms-transform: rotate(-35deg);
    -webkit-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }
`;

const MyImage = styled.img`
  display: inline-block;
  position: relative;
  margin: 0 10px 0 0;
  padding: 8px;
  max-width: 250px;
  border-radius: 12px;
  background: #30e852;
  font-size: 15px;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    right: -19px;
    border: 8px solid transparent;
    border-left: 18px solid #30e852;
    -ms-transform: rotate(-35deg);
    -webkit-transform: rotate(-35deg);
    transform: rotate(-35deg);
  }
`;

export const MyMessage: Message = props => {
  return (
    <MyContainer>
      {
        props.type === "message"
          ? <MyText>{props.data}</MyText>
          : <MyImage src={props.data} width="256" />
      }
    </MyContainer>
  );
}

const Balloon = styled.div`
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
`;
// const BalloonIcon = styled.img``;

const BalloonOuter = styled.div`
  width: 100%;
  text-align: left;
`;

const BalloonImg = styled.img`
  display: inline-block;
  position: relative;
  margin: 0 0 0 50px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: #edf1ee;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 3px;
    left: -19px;
    border: 8px solid transparent;
    border-right: 18px solid #edf1ee;
    -ms-transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
  }
`;

const BalloonText = styled.div`
  display: inline-block;
  position: relative;
  margin: 0 0 0 50px;
  padding: 10px;
  max-width: 250px;
  border-radius: 12px;
  background: #edf1ee;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 3px;
    left: -19px;
    border: 8px solid transparent;
    border-right: 18px solid #edf1ee;
    -ms-transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
    transform: rotate(35deg);
  }
`;

const BalloonInner = styled.p`
  margin: 0;
  padding: 0;
`;

export const YourMessage: Message = props => {
  return (
    <Balloon>
      <BalloonOuter>
      <div>{props.name}</div>
      {
        props.type === "message"
          ? (
                <BalloonText>
                  <BalloonInner>
                    {props.data}
                  </BalloonInner>
                </BalloonText>
            )
            : <BalloonImg src={props.data} width="256" />
      }
      </BalloonOuter>
    </Balloon>
  );
}