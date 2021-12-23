import { memo } from "react";

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

const CreateSVGDisplay = ({
  backgroundColor,
  firstLine,
  fontFamily,
  fontWeight,
  secondLine,
  textColor,
  thirdLine,
}) => (
  <div className="display">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      viewBox="0 0 350 350"
    >
      <defs>
        <style>
          {`.base {
            @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(
              " ",
              "+"
            )}:wght@300;500;700');
            fill: ${textColor};
            font-family: "${fontFamily}", sans-serif;
            font-size: ${Theme.font.size.md};
            font-weight: ${getFontWeight(fontWeight)};
          }`}
        </style>
      </defs>

      <rect width="100%" height="100%" fill={backgroundColor} />

      <text
        x="50%"
        y="50%"
        className="base"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        <tspan x="50%" dy={`-${Theme.lineHeight.md}`}>
          {firstLine ?? ""}
        </tspan>
        <tspan x="50%" dy={Theme.lineHeight.md}>
          {secondLine ?? ""}
        </tspan>
        <tspan x="50%" dy={Theme.lineHeight.md}>
          {thirdLine ?? ""}
        </tspan>
      </text>
    </svg>
  </div>
);

export default memo(CreateSVGDisplay);
