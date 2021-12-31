import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import { StackIcon } from "@radix-ui/react-icons";

import { Config, Routes } from "utils";
import { StyledContainer, StyledTitle } from "components";

// import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [createdHaikoins, setCreatedHaikoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
    } else {
      setWalletAddress(null);
    }
  }, []);

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
        walletAddress
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
  }, [walletAddress]);

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
        <h2>Items Created</h2>

        <div className="cards">
          {createdHaikoins.length > 0 ? (
            createdHaikoins.map((haikoin) => (
              <Link href={Routes.token(haikoin.id)} key={haikoin.id}>
                <a className="card">
                  <Image
                    alt={haikoin.name}
                    src={haikoin.image}
                    width={500}
                    height={500}
                  />
                  <div>
                    <p>Name: {haikoin.name}</p>
                    <p>Description: {haikoin.description}</p>
                    <p>TokenURI: {haikoin.uri}</p>
                  </div>
                </a>
              </Link>
            ))
          ) : (
            <p>No Haikoins created yet!</p>
          )}
        </div>
      </div>
    </StyledContainer>
  );
}
