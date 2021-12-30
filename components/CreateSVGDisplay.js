import { memo } from "react";

import { Fonts, Theme } from "../utils";

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
              font-family: ${fontFamily};
              src: url(data:application/x-font-woff;charset=utf-8;base64,${Fonts[fontFamily][fontWeight]});
              font-style: normal;
              font-weight: ${fontWeight};
            }
          `}
        </style>
      </defs>

      <rect width="100%" height="100%" fill={backgroundColor} />

      <text
        x="50%"
        y="50%"
        fill={textColor}
        fontFamily={fontFamily}
        fontSize={Theme.font.size.md}
        fontWeight={fontWeight}
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
