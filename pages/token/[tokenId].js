import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import { ChevronRightIcon, StackIcon } from "@radix-ui/react-icons";

import { Config, Routes } from "utils";
import { Container, Title } from "components";

// import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

export default function TokenView() {
  const router = useRouter();
  const { tokenId } = router.query;
  const [haikoin, setHaikoin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchHaikoin() {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const haikoinTokenContract = new ethers.Contract(
        Config.haikoinTokenContractAddress,
        HaikoinTokenContract.abi,
        provider
      );

      const haikoinURI = await haikoinTokenContract.tokenURI(tokenId);
      const { data } = await axios.get(haikoinURI);

      setHaikoin({ ...data, id: tokenId, uri: haikoinURI });
      setIsLoading(false);
    }

    fetchHaikoin();
  }, [tokenId]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <Head>
        <title>
          {haikoin.name ?? "Token not found"} | {Config.siteTitle}
        </title>
      </Head>

      <Title>
        <StackIcon />
        <Link href={Routes.dashboard}>
          <a>Dashboard</a>
        </Link>
        <ChevronRightIcon />
        <h1>{haikoin.name ?? "Token not found"}</h1>
      </Title>

      <div>
        <h2>{haikoin.name ?? "Token not found"}</h2>

        <div className="cards">
          {haikoin.image ? (
            <div className="card">
              <div>
                <p>Name: {haikoin.name}</p>
                <p>Description: {haikoin.description}</p>
                <p>TokenURI: {haikoin.uri}</p>
              </div>

              <Image
                alt={haikoin.name}
                src={haikoin.image}
                width={500}
                height={500}
              />
            </div>
          ) : (
            <p>Haikoin not found!</p>
          )}
        </div>
      </div>
    </Container>
  );
}
