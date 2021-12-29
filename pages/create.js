import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Web3Modal from "web3modal";
import { MagicWandIcon } from "@radix-ui/react-icons";

import HaikoinMarketContract from "../artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "../artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

import { Config, Theme } from "../utils";
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

  async function mintToken(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    // Create Haikoin token!
    const contract = new ethers.Contract(
      Config.haikoinTokenContractAddress,
      HaikoinTokenContract.abi,
      signer
    );
    const createTokenResponse = await contract.createToken(url);
    const response = await createTokenResponse.wait();
    const tokenCreatedEvent = response.events[0];
    const tokenCreatedValue = tokenCreatedEvent.args[2];
    const tokenAddress = tokenCreatedValue.toNumber();

    console.log({ tokenAddress });

    // TODO move listing logic to single Haikoin view
    // const price = ethers.utils.parseUnits(formData.price, "ether");
    // contract = new ethers.Contract(
    //   Config.haikoinMarketContractAddress,
    //   HaikoinMarketContract.abi,
    //   signer
    // );
    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();

    // transaction = await contract.createMarketItem(
    //   Config.haikoinTokenContractAddress,
    //   tokenId,
    //   price,
    //   {
    //     value: listingPrice,
    //   }
    // );
    // await transaction.wait();

    // TODO push to single token view with address
    // router.push("/haikoin/${tokenAddress");
  }

  async function handleCreate() {
    const { name, description } = formData;

    const getImageFromSvg = () =>
      new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = 2000;
        canvas.height = 2000;
        const canvasContext = canvas.getContext("2d");
        const tempImage = document.createElement("img");

        tempImage.onload = () => {
          canvasContext.drawImage(tempImage, 0, 0);

          // Create ipfs package
          const IPFSPackage = JSON.stringify({
            name,
            description,
            image: canvas.toDataURL("image/png"),
          });

          resolve(IPFSPackage);
        };

        tempImage.onError = reject;
        tempImage.setAttribute(
          "src",
          "data:image/svg+xml;base64," + btoa(svgRef.current.outerHTML)
        );
      });

    try {
      setUploadingToIPFS(true);

      const IPFSPackage = await getImageFromSvg();
      const IPFSResult = await client.add(IPFSPackage);

      setUploadingToIPFS(false);

      const ipfsPath = `https://ipfs.infura.io/ipfs/${IPFSResult.path}`;
      console.log({ ipfsPath });

      // After file is uploaded to IPFS, pass the URL to save it on Polygon
      mintToken(ipfsPath);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <StyledContainer>
      <CreateContainer.GlobalStyles />

      <Head>
        <title>Create | {Config.siteTitle}</title>
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
          uploadingToIPFS={uploadingToIPFS}
        />
        <CreateSVGDisplay {...formData} svgRef={svgRef} />
      </StyledCreate>
    </StyledContainer>
  );
}
