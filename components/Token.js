import styled from "styled-components";

import FlexBox from "./system/FlexBox";

const Token = styled(FlexBox)`
  flex-direction: row;

  @media (max-width: 960px) {
    flex-direction: column;
  }

  color: ${(props) => props.theme.colors.text.white};

  .image {
    margin-bottom: ${(props) => props.theme.rhythm};

    img {
      border-radius: ${(props) => props.theme.borderRadius.large};
    }
  }

  .name {
    font-size: ${(props) => props.theme.font.size.xl};
    line-height: ${(props) => props.theme.lineHeight.xl};
    margin: 0;
  }

  .description {
    font-style: italic;
    line-height: ${(props) => props.theme.lineHeight.md};
  }

  .list {
    padding-top: ${(props) => props.theme.rhythm};

    label {
      align-items: flex-end;
      color: ${(props) => props.theme.colors.text.default};
      display: flex;
      font-weight: ${(props) => props.theme.font.weight.bold};
      justify-content: space-between;
      line-height: 1;
      padding-bottom: ${(props) => `calc(${props.theme.rhythm}/2)`};
      width: 100%;

      span {
        color: ${(props) => props.theme.colors.text.white};
        font-size: ${(props) => props.theme.font.size.sm};
        font-weight: ${(props) => props.theme.font.weight.medium};
        text-transform: none;
      }
    }

    input + label {
      margin-top: ${(props) => props.theme.rhythm};
    }

    .error {
      color: ${(props) => props.theme.colors.text.error};
      font-size: ${(props) => props.theme.font.size.sm};
    }

    input {
      background-color: ${(props) => props.theme.colors.ui.transparent};
      border: 0;
      border-radius: ${(props) => props.theme.borderRadius.default};
      color: ${(props) => props.theme.colors.text.white};
      font-family: ${(props) => props.theme.font.family};
      font-size: 16px;
      margin-bottom: ${(props) => props.theme.rhythm};
      padding: ${(props) => props.theme.rhythm};
      min-width: 100%;

      ::placeholder {
        color: ${(props) => props.theme.colors.text.default};
        opacity: 0.3;
      }
    }
  }
`;

export default Token;
