import styled from "styled-components";

const StyledContainer = styled.div`
  margin: auto;
  max-width: ${(props) => props.theme.dimensions.wide};
  padding: 0 ${(props) => props.theme.rhythm};
  width: 100%;
`;

export default StyledContainer;
