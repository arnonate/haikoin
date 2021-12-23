import { Theme } from "../utils";

const getFontWeight = (weight) => {
  switch (weight) {
    case "Light":
      return 300;
    case "Regular":
      return 500;
    case "Bold":
      return 700;
    default:
      return 500;
  }
};

const CreateSVGDisplay = ({ formData }) => (
  <div className="display">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 350 350"
    >
      <defs>
        <style>
          {`.base {
                  @import url('https://fonts.googleapis.com/css2?family=${formData.fontFamily.replace(
                    " ",
                    "+"
                  )}:wght@300;500;700&display=swap');
                  fill: ${formData.textColor};
                  font-family: "${formData.fontFamily}", sans-serif;
                  font-size: ${Theme.font.size.md};
                  font-weight: ${getFontWeight(formData.fontWeight)};
                }`}
        </style>
      </defs>

      <rect width="100%" height="100%" fill={formData.backgroundColor} />

      <text
        x="50%"
        y="50%"
        className="base"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        <tspan x="50%" dy={`-${Theme.lineHeight.md}`}>
          {formData.firstLine ?? ""}
        </tspan>
        <tspan x="50%" dy={Theme.lineHeight.md}>
          {formData.secondLine ?? ""}
        </tspan>
        <tspan x="50%" dy={Theme.lineHeight.md}>
          {formData.thirdLine ?? ""}
        </tspan>
      </text>
    </svg>
  </div>
);

export default CreateSVGDisplay;
