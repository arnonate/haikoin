import styled from "styled-components";

const StyledTitle = styled.div`
  background-color: ${(props) => props.theme.colors.ui.transparent};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius.default};
  margin-bottom: ${(props) => `calc(${props.theme.rhythm}*3)`};
  padding: ${(props) => `calc(${props.theme.rhythm}/2) ${props.theme.rhythm}`};
  min-width: 100%;

  h1 {
    align-items: center;
    color: ${(props) => props.theme.colors.text.default};
    display: flex;
    font-size: ${(props) => props.theme.font.size.md};
    font-weight: ${(props) => props.theme.font.weight.bold};
    line-height: 1;
    text-transform: uppercase;

    svg {
      height: ${(props) => props.theme.font.size.md};
      margin-right: ${(props) => props.theme.font.size.sm};
      width: ${(props) => props.theme.font.size.md};
    }
  }
`;

export default StyledTitle;
