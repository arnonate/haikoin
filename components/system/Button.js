import styled from "styled-components";

import { Theme } from "utils";

function getBackgroundColor(variant) {
  return variant === "link" ? "transparent" : Theme.colors.text.link;
}

function getColor(variant) {
  return variant === "link"
    ? Theme.colors.text.default
    : Theme.colors.text.white;
}

function getSize(size) {
  return size === "small" ? Theme.font.size.sm : Theme.font.size.md;
}

const Button = styled.button`
  align-items: center;
  background-color: ${(props) => getBackgroundColor(props.variant)};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius.default};
  color: ${(props) => getColor(props.variant)};
  cursor: pointer;
  display: inline-flex;
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => getSize(props.size)};
  line-height: 1;
  padding: ${(props) => getSize(props.size)};

  & > * + * {
    margin-left: ${(props) => `calc(${props.theme.rhythm}/2)`};
  }

  &:hover {
    box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.3);
  }

  &:active {
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
  }

  & + & {
    margin-left: ${(props) => props.theme.rhythm};
  }
`;

export default Button;
