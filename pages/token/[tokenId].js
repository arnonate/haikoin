import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import {
  ChevronRightIcon,
  LayersIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

import { Config, Routes } from "utils";
import { Button, Container, Title, Token } from "components";

// import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

export default function TokenView() {
  const router = useRouter();
  const { tokenId } = router.query;
  const [haikoin, setHaikoin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listingEnabled, setListingEnabled] = useState(false);
  const [listingPrice, setListingPrice] = useState("");
  const [hasFormErrors, setHasFormErrors] = useState(false);

  console.log({ listingPrice });

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

  return (
    <Container>
      <Head>
        <title>
          {haikoin.name ?? "Token not found"} | {Config.siteTitle}
        </title>
      </Head>

      <Title>
        <LayersIcon />
        <Link href={Routes.dashboard}>
          <a>Dashboard</a>
        </Link>
        <ChevronRightIcon />
        <h1>{haikoin.name ?? "Token not found"}</h1>
      </Title>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {haikoin ? (
            <Token>
              <div>
                {haikoin.image ? (
                  <div className="image">
                    <Image
                      alt={haikoin.name}
                      src={haikoin.image}
                      width={2000}
                      height={2000}
                    />
                  </div>
                ) : null}
              </div>

              <div>
                <p className="name">{haikoin.name}</p>
                <p className="description">{haikoin.description}</p>
                <p className="stats">
                  {`Haikoin #${haikoin.id}`} |{" "}
                  <a href={haikoin.uri} target="_blank" rel="noreferrer">
                    View on IPFS
                  </a>
                </p>

                <div className="list">
                  {listingEnabled ? (
                    <>
                      <label htmlFor="price">
                        Price (in ETH)
                        {hasFormErrors ? (
                          <span className="error">
                            Price must be a valid number greater than 0.
                          </span>
                        ) : null}
                      </label>
                      <input
                        id="price"
                        name="price"
                        min="0.0001"
                        onChange={(event) =>
                          setListingPrice(event.target.value)
                        }
                        placeholder="0.25"
                        type="number"
                        step="0.0001"
                      />

                      <Button onClick={() => console.log("Listed!")}>
                        List for Sale!
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => setListingEnabled(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setListingEnabled(true)}>
                      <LightningBoltIcon />
                      <span>List on Market</span>
                      <LightningBoltIcon style={{ transform: "scaleX(-1)" }} />
                    </Button>
                  )}
                </div>
              </div>
            </Token>
          ) : (
            <p>Haikoin not found!</p>
          )}
        </div>
      )}
    </Container>
  );
}
