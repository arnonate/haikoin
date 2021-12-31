import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

import { StyledContainer } from "components";
import { Config } from "utils";

export default function Explore() {
  return (
    <>
      <Head>
        <title>{`Explore | ${Config.siteTitle}`}</title>
        <meta name="description" content="Explore the Haikoin marketplace!" />
      </Head>

      <main>
        <StyledContainer>Home</StyledContainer>
      </main>
    </>
  );
}
