import Head from "next/head";
import { LightningBoltIcon } from "@radix-ui/react-icons";

import { Config } from "utils";
import { StyledContainer, StyledTitle } from "components";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Explore | ${Config.siteTitle}`}</title>
        <meta name="description" content="Explore the Haikoin marketplace!" />
      </Head>

      <StyledContainer>
        <StyledTitle>
          <h1>
            <LightningBoltIcon /> Explore
          </h1>
        </StyledTitle>
      </StyledContainer>
    </>
  );
}
