import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  LightningBoltIcon,
  HomeIcon,
  MagicWandIcon,
  StackIcon,
} from "@radix-ui/react-icons";

import { Theme, Routes } from "../utils";
import { StyledHeader } from "../components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${Theme.colors.ui.default};
    color: ${Theme.colors.text.default};
    font-family: ${Theme.font.family};
    font-size: ${Theme.font.size.md};
    font-weight: ${Theme.font.weight.medium};
    line-height: ${Theme.lineHeight.md};
    min-height: 100vh;
  }

  a {
    color: ${Theme.colors.text.link};
    text-decoration: none;
  }

  img {
    height: auto;
  }

  button {
    border: 0;
    background-color: transparent;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

function Haikoin({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <GlobalStyle />

      <ThemeProvider theme={Theme}>
        <StyledHeader>
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
                <HomeIcon /> Home
              </a>
            </Link>
            <Link href={Routes.create}>
              <a className={router.asPath === Routes.create ? "active" : ""}>
                <MagicWandIcon /> Create
              </a>
            </Link>
            <Link href={Routes.mine}>
              <a className={router.asPath === Routes.mine ? "active" : ""}>
                <StackIcon /> My Haikoins
              </a>
            </Link>
            <Link href={Routes.dashboard}>
              <a className={router.asPath === Routes.dashboard ? "active" : ""}>
                <LightningBoltIcon /> Explore
              </a>
            </Link>
          </nav>
        </StyledHeader>

        <Component {...pageProps} />

        <footer>Footer text</footer>
      </ThemeProvider>
    </>
  );
}

export default Haikoin;
