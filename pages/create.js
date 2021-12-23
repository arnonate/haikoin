import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useEFfect, useState } from "react";
import { syllable } from "syllable";
import Web3Modal from "web3modal";
import { MagicWandIcon } from "@radix-ui/react-icons";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

import { Config, Fonts, Theme } from "../utils";
import {
  CreateForm,
  CreateSVGDisplay,
  StyledContainer,
  StyledCreate,
  StyledTitle,
} from "../components";
import CreateContainer from "../components/StyledCreate";
import useDebouncy from "use-debouncy/lib/effect";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    backgroundColor: Theme.colors.ui.dark,
    description: "",
    firstLine: "",
    fontFamily: "Hahmlet",
    fontWeight: "Regular",
    name: "",
    price: "",
    secondLine: "",
    textColor: Theme.colors.text.default,
    thirdLine: "",
  });

  const router = useRouter();

  // async function onChange(e) {
  //   const file = e.target.files[0];

  //   try {
  //     const added = await client.add(file, {
  //       progress: (prog) => console.log(`received: ${prog}`),
  //     });
  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;

  //     setFileUrl(url);
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  // }

  async function createNFT() {
    const { name, description, price } = formData;

    if (!name || !description || !price || !fileUrl) return;

    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(Config.nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formData.price, "ether");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(Config.nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(
      Config.nftaddress,
      tokenId,
      price,
      {
        value: listingPrice,
      }
    );

    await transaction.wait();
    router.push("/");
  }

  return (
    <StyledContainer>
      <CreateContainer.GlobalStyles />

      <Head>
        <title>Create | {Config.siteTitle}</title>

        {Fonts.map((font) => (
          <link
            key={font}
            href={`https://fonts.googleapis.com/css2?family=${font.replace(
              " ",
              "="
            )}:wght@300;500;700&display=swap`}
            media="print"
            onLoad="this.onload=null;this.removeAttribute('media');"
            rel="stylesheet"
          />
        ))}
      </Head>

      <StyledTitle>
        <h1>
          <MagicWandIcon /> Create
        </h1>
      </StyledTitle>

      <StyledCreate>
        <CreateForm formData={formData} setFormData={setFormData} />
        <CreateSVGDisplay {...formData} />
      </StyledCreate>
    </StyledContainer>
  );
}
