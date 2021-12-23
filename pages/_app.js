import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import {
  LightningBoltIcon,
  HomeIcon,
  MagicWandIcon,
  StackIcon,
} from "@radix-ui/react-icons";

import { Theme, Routes, Config } from "../utils";
import {
  GlobalStyles,
  StyledContainer,
  StyledFooter,
  StyledHeader,
} from "../components";

function Haikoin({ Component, pageProps }) {
  const router = useRouter();

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
                <a
                  className={router.asPath === Routes.dashboard ? "active" : ""}
                >
                  <LightningBoltIcon /> Explore
                </a>
              </Link>
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
