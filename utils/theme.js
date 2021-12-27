const base = `16`;

const theme = {
  borderRadius: {
    small: `4px`,
    default: `8px`,
    large: `16px`,
  },
  colors: {
    ui: {
      dark: `#07040d`,
      default: `#120A20`,
      highlight: `#7126BC`,
      transparent: `rgba(0, 0, 0, 0.6)`,
    },
    text: {
      default: `#8f75bd`,
      error: `#DA26DE`,
      highlight: `#7126BC`,
      link: `#DA26DE`,
      white: `#FFFFFF`,
    },
  },
  dimensions: {
    wide: `1650px`,
  },
  font: {
    family: `'Work Sans', sans-serif`,
    size: {
      sm: base * 0.618 + "px", // Based off golden ratio 1.618
      md: base + "px",
      lg: base * 1.618 + "px",
      xl: base * 1.618 * 2 + "px",
    },
    weight: {
      medium: `500`,
      light: `300`,
      bold: `700`,
    },
  },
  lineHeight: {
    md: base * 1.618 + "px",
    lg: base * 1.618 * 2 + "px",
    xl: base * 1.618 * 3 + "px",
  },
  rhythm: base * 1.618 + "px",
};

export default theme;
