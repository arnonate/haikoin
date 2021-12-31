import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

import { Config } from "utils";
import { StyledContainer, StyledTitle } from "components";

// import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

export default function CreatorDashboard() {
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
    <StyledContainer>
      <Head>
        <title>
          {haikoin.name ?? "Not found"} | {Config.siteTitle}
        </title>
      </Head>

      <StyledTitle>
        <h1>{haikoin.name ?? "Not found"}</h1>
      </StyledTitle>

      <div>
        <h2>{haikoin.name ?? "Not found"}</h2>

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
    </StyledContainer>
  );
}
