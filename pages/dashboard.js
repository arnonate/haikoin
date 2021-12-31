import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import { StackIcon } from "@radix-ui/react-icons";

import { Config, Routes } from "utils";
import { Button, StyledGrid, StyledContainer, StyledTitle } from "components";

// import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

export default function Dashboard() {
  const [createdHaikoins, setCreatedHaikoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchHaikoins() {
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

      const ownedHaikoinIds = await haikoinTokenContract.fetchOwnedTokenIds(
        window.ethereum.selectedAddress
      );

      const haikoinsData = await Promise.all(
        ownedHaikoinIds.map(async (haikoinId) => {
          const haikoinURI = await haikoinTokenContract.tokenURI(haikoinId);
          const { data } = await axios.get(haikoinURI);
          return { ...data, id: haikoinId, uri: haikoinURI };
        })
      );

      setCreatedHaikoins(haikoinsData);
      setIsLoading(false);
    }

    fetchHaikoins();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledContainer>
      <Head>
        <title>Dashboard | {Config.siteTitle}</title>
      </Head>

      <StyledTitle>
        <h1>
          <StackIcon /> Dashboard
        </h1>
      </StyledTitle>

      <div>
        <StyledGrid>
          {createdHaikoins.length > 0 ? (
            createdHaikoins.map((haikoin) => (
              <div className="token" key={haikoin.id}>
                <h3>{haikoin.name}</h3>
                <p>{haikoin.description}</p>

                <Link href={Routes.token(haikoin.id)}>
                  <a className="token-image">
                    <Image
                      alt={haikoin.name}
                      src={haikoin.image}
                      width={500}
                      height={500}
                    />
                  </a>
                </Link>

                <Link href={Routes.token(haikoin.id)}>
                  <a className="token-view">
                    <Button>View / Sell</Button>
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p>No Haikoins created yet!</p>
          )}
        </StyledGrid>
      </div>
    </StyledContainer>
  );
}
