import styled from "styled-components";

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
      color: ${(props) => props.theme.colors.text.default};
      font-size: 16px;
      padding: ${(props) => props.theme.rhythm};
      min-width: 100%;
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
        border: ${(props) => `2px solid ${props.theme.colors.text.default}`};
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
        color: ${(props) => props.theme.colors.text.default};
        cursor: pointer;
        display: flex;
        font-size: 16px;
        padding: ${(props) => `calc(${props.theme.rhythm}/2)`};

        svg {
          height: ${(props) => props.theme.font.size.md};
          margin-left: ${(props) => `calc(${props.theme.rhythm}/4)`};
          width: ${(props) => props.theme.font.size.md};
        }
      }

      .list {
        background-color: ${(props) => props.theme.colors.ui.transparent};
        border-radius: ${(props) => props.theme.borderRadius.default};
      }

      .react-colorful {
        height: 160px;
        width: 160px;

        .react-colorful__saturation-pointer,
        .react-colorful__hue-pointer {
          cursor: grab;
          height: ${(props) => props.theme.font.size.md};
          width: ${(props) => props.theme.font.size.md};
        }
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

export default CreateContainer;
