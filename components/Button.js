import styled from "styled-components";

const Button = styled.button`
  align-items: center;
  background-color: ${(props) => props.theme.colors.text.link};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius.default};
  color: ${(props) => props.theme.colors.text.white};
  cursor: pointer;
  display: flex;
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.md};
  line-height: 1;
  padding: ${(props) => props.theme.rhythm};
  text-transform: uppercase;

  & > * + * {
    margin-left: ${(props) => `calc(${props.theme.rhythm}/2)`};
  }

  &:hover {
    box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.3);
  }

  &:active {
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.3);
  }
`;

export default Button;
