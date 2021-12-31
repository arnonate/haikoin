import Head from "next/head";
import { LightningBoltIcon } from "@radix-ui/react-icons";

import { Config } from "utils";
import { Container, Title } from "components";

export default function ExploreView() {
  return (
    <Container>
      <Head>
        <title>{`Explore | ${Config.siteTitle}`}</title>
        <meta name="description" content="Explore the Haikoin marketplace!" />
      </Head>

      <Title>
        <LightningBoltIcon />
        <h1>Explore</h1>
      </Title>
    </Container>
  );
}
