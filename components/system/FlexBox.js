import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  & > * {
    width: ${(props) => `calc(50% - ${props.theme.rhythm})`};
  }

  @media (max-width: 960px) {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;

export default FlexBox;
