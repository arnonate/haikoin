import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "styled-components";
import {
  LightningBoltIcon,
  HomeIcon,
  MagicWandIcon,
  LayersIcon,
} from "@radix-ui/react-icons";

import { Theme, Routes, Config } from "utils";
import {
  ActiveLink,
  GlobalStyles,
  Container,
  Footer,
  Header,
} from "components";

function Haikoin({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />

      <header>
        <Header>
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
                <LayersIcon /> Dashboard
              </a>
            </ActiveLink>
            <ActiveLink activeClassName="active" href={Routes.explore}>
              <a>
                <LightningBoltIcon /> Explore
              </a>
            </ActiveLink>
          </nav>
        </Header>
      </header>

      <main>
        <Component {...pageProps} />
      </main>

      <footer>
        <Footer>
          <Container>
            &copy;2022 <a href="https://twitter.com/HaikoinNFT">@HaikoinNFT</a>{" "}
            | An <a href="#0">elemint</a> project | Powered by{" "}
            <a href="https://polygon.technology/">Polygon</a>
          </Container>
        </Footer>
      </footer>
    </ThemeProvider>
  );
}

export default Haikoin;
