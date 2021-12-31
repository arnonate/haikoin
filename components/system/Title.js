import styled from "styled-components";

const Title = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.transparent};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius.default};
  display: inline-flex;
  font-size: ${(props) => props.theme.font.size.md};
  font-weight: ${(props) => props.theme.font.weight.bold};
  line-height: 1;
  margin-bottom: ${(props) => `calc(${props.theme.rhythm}*3)`};
  padding: ${(props) => `calc(${props.theme.rhythm}/2) ${props.theme.rhythm}`};
  min-width: 100%;

  & > * {
    margin-right: ${(props) => props.theme.font.size.sm};
  }

  a {
    color: ${(props) => props.theme.colors.text.default};
    display: inline-flex;
  }

  svg {
    height: ${(props) => props.theme.font.size.md};
    width: ${(props) => props.theme.font.size.md};
  }

  h1 {
    align-items: center;
    color: ${(props) => props.theme.colors.text.white};
    display: inline-flex;
    font-size: ${(props) => props.theme.font.size.md};
    font-weight: ${(props) => props.theme.font.weight.bold};
    line-height: 1;
  }
`;

export default Title;
