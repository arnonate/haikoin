import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "styled-components";
import {
  LightningBoltIcon,
  HomeIcon,
  MagicWandIcon,
  StackIcon,
} from "@radix-ui/react-icons";

import { Theme, Routes, Config } from "../utils";
import {
  ActiveLink,
  GlobalStyles,
  StyledContainer,
  StyledFooter,
  StyledHeader,
} from "../components";

function Haikoin({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={Theme}>
        <header>
          <StyledHeader>
            <div className="logo">
              <Link href={Routes.home}>
                <a>
                  <Image
                    alt={Config.siteTitle}
                    src="/logo.png"
                    width={1200}
                    height={150}
                    priority
                  />
                </a>
              </Link>
            </div>

            <nav className="nav">
              <ActiveLink activeClassName="active" href={Routes.home}>
                <a>
                  <HomeIcon /> Home
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="active" href={Routes.create}>
                <a>
                  <MagicWandIcon /> Create
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="active" href={Routes.dashboard}>
                <a>
                  <StackIcon /> Dashboard
                </a>
              </ActiveLink>
              <ActiveLink activeClassName="active" href={Routes.explore}>
                <a>
                  <LightningBoltIcon /> Explore
                </a>
              </ActiveLink>
            </nav>
          </StyledHeader>
        </header>

        <Component {...pageProps} />

        <footer>
          <StyledFooter>
            <StyledContainer>
              &copy;2022{" "}
              <a href="https://twitter.com/HaikoinNFT">@HaikoinNFT</a> | An{" "}
              <a href="#0">elemint</a> project | Powered by{" "}
              <a href="https://polygon.technology/">Polygon</a>
            </StyledContainer>
          </StyledFooter>
        </footer>
      </ThemeProvider>
    </>
  );
}

export default Haikoin;
