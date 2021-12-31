import Head from "next/head";
import { HomeIcon } from "@radix-ui/react-icons";

import { Config } from "utils";
import { StyledContainer, StyledTitle } from "components";

export default function Home() {
  return (
    <>
      <Head>
        <title>{Config.siteTitle}</title>
        <meta name="description" content={Config.siteDescription} />
      </Head>

      <StyledContainer>
        <StyledTitle>
          <h1>
            <HomeIcon /> Home
          </h1>
        </StyledTitle>
      </StyledContainer>
    </>
  );
}
