import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import { StackIcon } from "@radix-ui/react-icons";

import { StyledContainer, StyledTitle } from "../components";

// import HaikoinMarketContract from "../artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "../artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

import { Config } from "../utils";

export default function CreatorDashboard() {
  const [createdHaikoins, setCreatedHaikoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();

    // const marketContract = new ethers.Contract(
    //   Config.haikoinMarketContractAddress,
    //   HaikoinMarketContract.abi,
    //   signer
    // );
    const haikoinTokenContract = new ethers.Contract(
      Config.haikoinTokenContractAddress,
      HaikoinTokenContract.abi,
      provider
    );
    // const data = await marketContract.fetchItemsCreated();
    // const items = await Promise.all(
    //   data.map(async (i) => {
    //     const tokenUri = await haikoinTokenContract.tokenURI(i.tokenId);
    //     const meta = await axios.get(tokenUri);
    //     let price = ethers.utils.formatUnits(i.price.toString(), "ether");
    //     let item = {
    //       price,
    //       tokenId: i.tokenId.toNumber(),
    //       seller: i.seller,
    //       owner: i.owner,
    //       sold: i.sold,
    //       image: meta.data.image,
    //     };
    //     return item;
    //   })
    // );

    console.log({ walletAddress: window.ethereum.selectedAddress });

    const haikoins = await haikoinTokenContract.fetchHaikoinsOwned(
      window.ethereum.selectedAddress
    );

    console.log({ haikoins });
    const haikoinsData = await Promise.all(
      haikoins.map(async (haikoin) => {
        const { data } = await axios.get(haikoin);
        return { ...data, tokenURI: haikoin };
      })
    );

    console.log({ haikoinsData });
    setCreatedHaikoins(haikoinsData);

    setIsLoading(false);
  }

  useEffect(() => {
    loadNFTs();
  }, []);

  // if (isLoading === "loaded" && !createdHaikoins.length)

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledContainer>
      <Head>
        <title>Create | {Config.siteTitle}</title>
      </Head>

      <StyledTitle>
        <h1>
          <StackIcon /> My Haikoins
        </h1>
      </StyledTitle>

      <div>
        <h2>Items Created</h2>

        <div>
          {createdHaikoins.length > 0 ? (
            createdHaikoins.map((createdHaikoin) => (
              <div key={createdHaikoin.tokenURI}>
                <Image
                  alt={createdHaikoin.name}
                  src={createdHaikoin.image}
                  width={500}
                  height={500}
                />
                <div>
                  <p>Name: {createdHaikoin.name}</p>
                  <p>Description: {createdHaikoin.description}</p>
                  <p>TokenURI: {createdHaikoin.tokenURI}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No Haikoins created yet!</p>
          )}
        </div>
      </div>
    </StyledContainer>
  );
}
