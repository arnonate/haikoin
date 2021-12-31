import Head from "next/head";
import { HomeIcon } from "@radix-ui/react-icons";

import { Config } from "utils";
import { Container, Title } from "components";

export default function IndexView() {
  return (
    <Container>
      <Head>
        <title>{Config.siteTitle}</title>
        <meta name="description" content={Config.siteDescription} />
      </Head>

      <h1>Haikoin</h1>
    </Container>
  );
}
