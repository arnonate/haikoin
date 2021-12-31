import styled from "styled-components";

const Footer = styled.div`
  background-color: ${(props) => props.theme.colors.ui.dark};
  display: flex;
  margin-top: ${(props) => `calc(${props.theme.rhythm}*3)`};
  padding: ${(props) => `calc(${props.theme.rhythm}*3) ${props.theme.rhythm}`};
  text-align: center;
`;

export default Footer;
