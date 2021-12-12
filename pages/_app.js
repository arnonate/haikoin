import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { FaBolt, FaCoins, FaHome, FaMagic } from "react-icons/fa";

import { Theme, Routes } from "../utils";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${Theme.colors.ui.default};
    color: ${Theme.colors.text.default};
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: ${Theme.font.weight.default};
    line-height: ${Theme.lineHeight.default};
    min-height: 100vh;
  }

  a {
    color: ${Theme.colors.text.link};
    text-decoration: none;
  }

  img {
    height: auto;
  }

  * {
    box-sizing: border-box;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: ${(props) => props.theme.dimensions.wide};
  padding: ${(props) => props.theme.rhythm};
  width: 100%;

  .logo {
    width: 300px;
  }

  .nav {
    a {
      align-items: center;
      display: inline-flex;
      font-weight: ${(props) => props.theme.font.weight.bold};

      &.active {
        border-bottom: 3px solid;
      }

      span {
        padding-left: 5px;
      }
    }

    & > * + * {
      margin-left: 1.5rem;
    }
  }
`;

function Haikoin({ Component, pageProps }) {
  const router = useRouter();

  console.log(router.asPath);

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={Theme}>
        <Header>
          <div className="logo">
            <Link href={Routes.home}>
              <a>
                <Image
                  alt="Haikoin Haiku NFT Marketplace"
                  src="/logo.png"
                  width={1200}
                  height={150}
                  priority
                />
              </a>
            </Link>
          </div>

          <nav className="nav">
            <Link href={Routes.home}>
              <a className={router.asPath === Routes.home ? "active" : ""}>
                <FaHome />
                <span>Home</span>
              </a>
            </Link>
            <Link href={Routes.create}>
              <a className={router.asPath === Routes.create ? "active" : ""}>
                <FaMagic />
                <span>Create</span>
              </a>
            </Link>
            <Link href={Routes.mine}>
              <a className={router.asPath === Routes.mine ? "active" : ""}>
                <FaCoins />
                <span>My Haikoins</span>
              </a>
            </Link>
            <Link href={Routes.dashboard}>
              <a className={router.asPath === Routes.dashboard ? "active" : ""}>
                <FaBolt />
                <span>Dashboard</span>
              </a>
            </Link>
          </nav>
        </Header>

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default Haikoin;
