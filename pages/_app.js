import Link from "next/link";
import Image from "next/image";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    ui: {
      default: `#1B0F30`,
      hightlight: `#7126BC`,
    },
    text: {
      default: `#FFFFFF`,
      link: `#DA26DE`,
    },
  },
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: ${theme.colors.ui.default};
    color: ${theme.colors.text.default};
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: ${theme.colors.text.link};
    text-decoration: none;
  }

  img {
    height: auto;
  }

  * {
    box-sizing: border-box;
  }

  .logo {
    width: 300px;
  }
`;

function Haikoin({ Component, pageProps }) {
  return (
    <>
      <div className="logo">
        <Image
          alt="Haikoin Haiku NFT Marketplace"
          src="/logo.png"
          width={1200}
          height={150}
          priority
        />
      </div>

      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/create-item">
          <a>Sell Digital Asset</a>
        </Link>
        <Link href="/my-assets">
          <a>My Digital Assets</a>
        </Link>
        <Link href="/creator-dashboard">
          <a>Creator Dashboard</a>
        </Link>
      </nav>

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default Haikoin;
