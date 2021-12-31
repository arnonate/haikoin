import styled from "styled-components";

const StyledGrid = styled.div`
  display: grid;
  gap: ${(props) => `calc(${props.theme.rhythm}*2)`};
  grid: auto-flow / repeat(4, 1fr);

  @media (max-width: 1240px) {
    grid: auto-flow / repeat(3, 1fr);
  }

  @media (max-width: 960px) {
    grid: auto-flow / repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid: auto-flow / repeat(1, 1fr);
  }

  .token {
    color: ${(props) => props.theme.colors.text.white};
    text-align: center;

    h3 {
      font-size: ${(props) => props.theme.font.size.md};
      font-weight: ${(props) => props.theme.font.weight.bold};
      line-height: ${(props) => props.theme.lineHeight.md};
      margin: ${(props) => `0 0 calc(${props.theme.rhythm}/4)`};
    }

    p {
      font-weight: ${(props) => props.theme.font.weight.light};
      margin: ${(props) => `0 0 ${props.theme.rhythm}`};
    }

    a.token-image {
      display: block;

      img {
        border-radius: ${(props) => props.theme.borderRadius.large};
      }

      &:hover {
        opacity: 0.7;
      }
    }

    .token-view {
      display: block;

      button {
        margin: ${(props) => `${props.theme.rhythm} auto`};
      }
    }
  }
`;

export default StyledGrid;
