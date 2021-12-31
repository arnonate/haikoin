import styled from "styled-components";

const Footer = styled.div`
  background-color: ${(props) => props.theme.colors.ui.dark};
  display: flex;
  margin-top: ${(props) => `calc(${props.theme.rhythm}*3)`};
  padding: ${(props) => `calc(${props.theme.rhythm}*3) ${props.theme.rhythm}`};
  text-align: center;

  .channels {
    color: ${(props) => props.theme.colors.text.default};

    & > * {
      margin: ${(props) => `0 calc(${props.theme.rhythm}/4)`};
    }

    svg {
      height: ${(props) => props.theme.font.size.lg};
      width: ${(props) => props.theme.font.size.lg};
    }
  }
`;

export default Footer;
