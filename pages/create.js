import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
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

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Create() {
  const svgRef = useRef(null);

  const [uploadingToIPFS, setUploadingToIPFS] = useState(false);
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

    /* then list the item for sale on the marketplace */
    const price = ethers.utils.parseUnits(formData.price, "ether");
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
    // TODO push to creator dashboard instead of marketplace
    router.push("/");
  }

  async function handleCreate() {
    var canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 2000;
    var ctx = canvas.getContext("2d");

    //display image
    var img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(svgRef.current.outerHTML)
    );

    img.onload = function () {
      ctx.drawImage(img, 0, 0);

      console.log(canvas.toDataURL("image/png"));
    };

    const { name, description } = formData;

    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      // image,
    });

    try {
      setUploadingToIPFS(true);
      // const added = await client.add(data);
      setUploadingToIPFS(false);

      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      // createSale(url);
      // console.log({ url });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  let str;
  if (typeof window !== "undefined" && svgRef.current) {
    str = window.btoa(svgRef.current.outerHTML);
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
              "+"
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
        <CreateForm
          formData={formData}
          setFormData={setFormData}
          onCreateClick={handleCreate}
        />
        <CreateSVGDisplay {...formData} svgRef={svgRef} />
      </StyledCreate>
    </StyledContainer>
  );
}
