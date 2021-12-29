import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import HaikoinMarketContract from "../artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "../artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

import { Config } from "../utils";

const Main = styled.main`
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.ui.primary};
`;

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(
      Config.haikoinTokenContractAddress,
      HaikoinTokenContract.abi,
      provider
    );
    const marketContract = new ethers.Contract(
      Config.haikoinMarketContractAddress,
      HaikoinMarketContract.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      haikoinMarketContractAddress,
      HaikoinMarketContract.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      haikoinTokenContractAddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1>No items in marketplace</h1>;

  return (
    <>
      <Head>
        <title>{Config.siteTitle}</title>
        <meta name="description" content={Config.siteDescription} />
      </Head>

      <Main>
        {nfts.map((nft, i) => (
          <div key={i} className="border shadow rounded-xl overflow-hidden">
            <Image alt="" src={nft.image} width={800} height={800} />

            <div className="p-4">
              <p style={{ height: "64px" }} className="text-2xl font-semibold">
                {nft.name}
              </p>
              <div style={{ height: "70px", overflow: "hidden" }}>
                <p className="text-gray-400">{nft.description}</p>
              </div>
            </div>
            <div className="p-4 bg-black">
              <p className="text-2xl mb-4 font-bold text-white">
                {nft.price} ETH
              </p>
              <button
                className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                onClick={() => buyNft(nft)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </Main>
    </>
  );
}
