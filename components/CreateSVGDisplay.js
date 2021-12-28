import { memo } from "react";

import { Theme } from "../utils";
import { Hahmlet } from "../fonts/Hahmlet";

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
  svgRef,
}) => (
  <div className="display">
    <svg
      className="haikoin"
      preserveAspectRatio="xMinYMin meet"
      ref={svgRef}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            @font-face {
              font-family: Hahmlet;
              src: url(data:application/font-woff;charset=utf-8;base64,${Hahmlet})  format('woff');
              font-style: normal;
            }
          `}
        </style>
      </defs>

      <rect width="100%" height="100%" fill={backgroundColor} />

      <text
        x="50%"
        y="50%"
        fill={textColor}
        fontFamily="Hahmlet"
        fontSize={Theme.font.size.md}
        fontWeight={getFontWeight(fontWeight)}
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
