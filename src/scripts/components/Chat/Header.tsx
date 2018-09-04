import * as React from "react";
import styled from "styled-components";

interface Props {
  userName: string;
}

const Name = styled.div``;

export const Header: React.StatelessComponent<Props> = ({ userName }) => {
  return (
    <Name>{userName}</Name>
  );
}