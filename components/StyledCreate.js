import styled, { createGlobalStyle } from "styled-components";

const CreateContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    width: ${(props) => `calc(50% - ${props.theme.rhythm})`};
  }

  .form {
    display: flex;
    flex-direction: column;

    label {
      align-items: flex-end;
      display: flex;
      font-weight: ${(props) => props.theme.font.weight.bold};
      justify-content: space-between;
      line-height: 1;
      padding-bottom: ${(props) => `calc(${props.theme.rhythm}/2)`};
      text-transform: uppercase;
      width: 100%;

      span {
        color: ${(props) => props.theme.colors.text.white};
        font-size: ${(props) => props.theme.font.size.sm};
        font-weight: ${(props) => props.theme.font.weight.medium};
        text-transform: none;
      }
    }

    input + label,
    textarea + label {
      margin-top: ${(props) => props.theme.rhythm};
    }

    input,
    textarea {
      background-color: ${(props) => props.theme.colors.ui.transparent};
      border: 0;
      border-radius: ${(props) => props.theme.borderRadius.default};
      color: ${(props) => props.theme.colors.text.white};
      font-family: ${(props) => props.theme.font.family};
      font-size: 16px;
      padding: ${(props) => props.theme.rhythm};
      min-width: 100%;

      ::placeholder {
        color: ${(props) => props.theme.colors.text.default};
        opacity: 0.3;
      }
    }

    .fields {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: ${(props) => `calc(${props.theme.rhythm}/2) 0`};

      & > * {
        width: ${(props) => `calc(50% - ${props.theme.rhythm})`};
      }

      .control {
        align-items: center;
        display: flex;
        justify-content: left;

        label {
          line-height: 1;
          padding: ${(props) => `${props.theme.rhythm} 0`};
          padding-right: ${(props) => `calc(${props.theme.rhythm}/2)`};
          width: auto;
        }

        .color {
          border: ${(props) => `2px solid ${props.theme.colors.text.white}`};
          border-radius: ${(props) => props.theme.borderRadius.small};
          cursor: pointer;
          height: ${(props) => props.theme.rhythm};
          width: ${(props) => `calc(${props.theme.rhythm}*2)`};
        }

        .select {
          align-items: center;
          background-color: ${(props) => props.theme.colors.ui.transparent};
          border: 0;
          border-radius: ${(props) => props.theme.borderRadius.default};
          color: ${(props) => props.theme.colors.text.white};
          cursor: pointer;
          display: flex;
          font-size: 16px;
          justify-content: space-between;
          padding: ${(props) => `calc(${props.theme.rhythm}/2)`};
          width: 160px;

          svg {
            height: ${(props) => props.theme.font.size.md};
            margin-left: ${(props) => `calc(${props.theme.rhythm}/4)`};
            width: ${(props) => props.theme.font.size.md};
          }
        }
      }

      .mintButton {
        align-self: flex-end;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .display {
    svg {
      border: ${(props) => `8px solid ${props.theme.colors.ui.transparent}`};
      border-radius: ${(props) => props.theme.borderRadius.large};
    }
  }
`;

const CreateGlobalStyles = createGlobalStyle`
  .list {
    background-color: ${(props) => props.theme.colors.ui.dark};
    border-radius: ${(props) => props.theme.borderRadius.default};
    max-height: 200px;
    overflow: scroll;
    padding: ${(props) => `calc(${props.theme.rhythm}/2)`};
    width: 200px;

    ul {
      margin: 0;
      padding: 0;

      li {
        color: ${(props) => props.theme.colors.text.white};
        cursor: pointer;
        display: block;
        line-height: 1;
        padding: ${(props) => `calc(${props.theme.rhythm}/2)`};

        &:hover {
          background-color: rgba(255,255,255,0.1)
        }
      }
    }
  }

  .colorPicker {
    text-align: right;

    svg {
      cursor: pointer;
      height: ${(props) => props.theme.font.size.lg};
      width: ${(props) => props.theme.font.size.lg};
    }
  }

  .react-colorful {
    height: 160px;
    width: 160px;

    .react-colorful__pointer {
      cursor: grab;
      height: ${(props) => props.theme.font.size.lg};
      width: ${(props) => props.theme.font.size.lg};
    }
  }
`;

CreateContainer.GlobalStyles = CreateGlobalStyles;

export default CreateContainer;
