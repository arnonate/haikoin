import styled from "styled-components";

import { StyledContainer } from ".";

const StyledHeader = styled(StyledContainer)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  line-height: 1;
  margin-bottom: ${(props) => props.theme.rhythm};
  padding: ${(props) =>
    `calc(${props.theme.rhythm}*3) ${props.theme.rhythm} ${props.theme.rhythm}`};

  .logo {
    width: 300px;
  }

  .nav {
    a {
      align-items: center;
      color: ${(props) => props.theme.colors.text.default};
      display: inline-flex;
      font-weight: ${(props) => props.theme.font.weight.bold};
      padding: 0 9px 9px;
      text-transform: uppercase;

      &.active {
        color: ${(props) => props.theme.colors.text.white};
      }

      svg {
        margin-right: ${(props) => props.theme.font.size.sm};
      }
    }

    & > * + * {
      margin-left: 1.5rem;
    }
  }
`;

export default StyledHeader;
