import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  max-width: ${(props) => props.theme.dimensions.wide};
  padding: 0 ${(props) => props.theme.rhythm};
  width: 100%;
`;

export default Container;
