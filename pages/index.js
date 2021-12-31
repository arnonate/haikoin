import Head from "next/head";

import { Config } from "utils";
import { StyledContainer } from "components";

export default function Home() {
  return (
    <>
      <Head>
        <title>{Config.siteTitle}</title>
        <meta name="description" content={Config.siteDescription} />
      </Head>

      <main>
        <StyledContainer>Home</StyledContainer>
      </main>
    </>
  );
}
