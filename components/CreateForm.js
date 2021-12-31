import { useState } from "react";
import { syllable } from "syllable";
import * as ReactPopover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";
import {
  CaretDownIcon,
  Cross2Icon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

import { Fonts } from "../utils";
import { Button } from "components";

const CreateForm = ({
  formData,
  setFormData,
  onCreateClick,
  uploadingToIPFS,
}) => {
  const [fontPickerOpen, setFontPickerOpen] = useState(false);
  const [weightPickerOpen, setWeightPickerOpen] = useState(false);
  const [backgroundPickerOpen, setBackgroundPickerOpen] = useState(false);
  const [textPickerOpen, setTextPickerOpen] = useState(false);

  const defaultErrorState = {
    description: false,
    firstLine: false,
    name: false,
    price: false,
    secondLine: false,
    thirdLine: false,
  };
  const [hasFormErrors, setHasFormErrors] = useState(defaultErrorState);

  const setFormError = (field) => {
    setHasFormErrors((state) => ({
      ...state,
      [field]: true,
    }));
  };

  const handleInputChange = (event) => {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateClick = (event) => {
    event.preventDefault();
    // Reset form errors
    setHasFormErrors(defaultErrorState);

    const { name, description, firstLine, secondLine, thirdLine } = formData;

    // Check form for missing fields and eject with error
    if (!firstLine || syllable(firstLine) !== 5) {
      setFormError("firstLine");
      return;
    }

    if (!secondLine || syllable(secondLine) !== 7) {
      setFormError("secondLine");
      return;
    }

    if (!thirdLine || syllable(thirdLine) !== 5) {
      setFormError("thirdLine");
      return;
    }

    if (!name) {
      setFormError("name");
      return;
    }

    if (!description) {
      setFormError("description");
      return;
    }

    onCreateClick();
  };

  return (
    <form className="form">
      <label htmlFor="firstLine">
        First Line{" "}
        {hasFormErrors.firstLine ? (
          <span className="error">
            First line must be present and 5 syllables.
          </span>
        ) : (
          <span>{syllable(formData.firstLine)} of 5 syllables</span>
        )}
      </label>
      <input
        id="firstLine"
        name="firstLine"
        placeholder="First line of Haikoin"
        onChange={handleInputChange}
      />

      <label htmlFor="secondLine">
        Second Line{" "}
        {hasFormErrors.secondLine ? (
          <span className="error">
            Second line must be present and 7 syllables.
          </span>
        ) : (
          <span>{syllable(formData.secondLine)} of 7 syllables</span>
        )}
      </label>
      <input
        id="secondLine"
        name="secondLine"
        placeholder="Second line of the Haikoin"
        onChange={handleInputChange}
      />

      <label htmlFor="thirdLine">
        Third Line{" "}
        {hasFormErrors.thirdLine ? (
          <span className="error">
            Third line must be present and 7 syllables.
          </span>
        ) : (
          <span>{syllable(formData.thirdLine)} of 5 syllables</span>
        )}
      </label>
      <input
        id="thirdLine"
        name="thirdLine"
        placeholder="Third line of Haikoin"
        onChange={handleInputChange}
      />

      <label htmlFor="name">
        Name of your Haikoin{" "}
        {hasFormErrors.name ? (
          <span className="error">Name is required</span>
        ) : null}
      </label>
      <input
        id="name"
        name="name"
        placeholder="Name"
        onChange={handleInputChange}
      />

      <label htmlFor="description">
        Description of your Haikoin{" "}
        {hasFormErrors.description ? (
          <span className="error">Description is required.</span>
        ) : null}
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        onChange={handleInputChange}
      />

      <div className="fields">
        <div className="control">
          <label>Font Family:</label>
          <ReactPopover.Root
            modal={true}
            open={fontPickerOpen}
            onOpenChange={(open) => setFontPickerOpen(open)}
          >
            <ReactPopover.Trigger>
              <div className="select">
                {formData.fontFamily}
                <CaretDownIcon />
              </div>
            </ReactPopover.Trigger>
            <ReactPopover.Content>
              <div className="list">
                <ul
                  onMouseUp={(event) => {
                    setFormData((state) => ({
                      ...state,
                      fontFamily: event.target.innerText,
                    }));
                    setFontPickerOpen(false);
                  }}
                >
                  {Object.keys(Fonts).map((font) => (
                    <li key={font}>{font}</li>
                  ))}
                </ul>
              </div>
            </ReactPopover.Content>
          </ReactPopover.Root>
        </div>

        <div className="control">
          <label>Font Weight:</label>
          <ReactPopover.Root
            modal={true}
            open={weightPickerOpen}
            onOpenChange={(open) => setWeightPickerOpen(open)}
          >
            <ReactPopover.Trigger>
              <div className="select">
                {formData.fontWeight}
                <CaretDownIcon />
              </div>
            </ReactPopover.Trigger>
            <ReactPopover.Content>
              <div className="list">
                <ul
                  onMouseUp={(event) => {
                    setFormData((state) => ({
                      ...state,
                      fontWeight: event.target.innerText,
                    }));
                    setWeightPickerOpen(false);
                  }}
                >
                  {["Light", "Medium", "Bold"].map((weight) => (
                    <li key={weight}>{weight}</li>
                  ))}
                </ul>
              </div>
            </ReactPopover.Content>
          </ReactPopover.Root>
        </div>

        <div className="control">
          <label>Background Color:</label>
          <ReactPopover.Root
            modal={true}
            open={backgroundPickerOpen}
            onOpenChange={(open) => setBackgroundPickerOpen(open)}
          >
            <ReactPopover.Trigger>
              <div
                className="color"
                style={{ backgroundColor: formData.backgroundColor }}
              />
            </ReactPopover.Trigger>
            <ReactPopover.Content>
              <div className="colorPicker">
                <Cross2Icon onClick={() => setBackgroundPickerOpen(false)} />
                <HexColorPicker
                  color={formData.backgroundColor}
                  onChange={(color) =>
                    setFormData((state) => ({
                      ...state,
                      backgroundColor: color,
                    }))
                  }
                />
              </div>
            </ReactPopover.Content>
          </ReactPopover.Root>
        </div>

        <div className="control">
          <label>Text Color:</label>
          <ReactPopover.Root
            modal={true}
            open={textPickerOpen}
            onOpenChange={(open) => setTextPickerOpen(open)}
          >
            <ReactPopover.Trigger>
              <div
                className="color"
                style={{ backgroundColor: formData.textColor }}
              />
            </ReactPopover.Trigger>
            <ReactPopover.Content>
              <HexColorPicker
                color={formData.textColor}
                onChange={(color) =>
                  setFormData((state) => ({
                    ...state,
                    textColor: color,
                  }))
                }
              />
            </ReactPopover.Content>
          </ReactPopover.Root>
        </div>
      </div>

      <div className="mintButton">
        <Button onClick={handleCreateClick}>
          <MagicWandIcon />
          <span>
            {uploadingToIPFS ? `Uploading to IPFS...` : `Mint Your Haikoin`}
          </span>
          <MagicWandIcon style={{ transform: "scaleX(-1)" }} />
        </Button>
      </div>
    </form>
  );
};

export default CreateForm;
