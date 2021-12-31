import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Web3Modal from "web3modal";
import { MagicWandIcon } from "@radix-ui/react-icons";

// import HaikoinMarketContract from "artifacts/contracts/HaikoinMarket.sol/HaikoinMarket.json";
import HaikoinTokenContract from "artifacts/contracts/HaikoinToken.sol/HaikoinToken.json";

import { Config, Routes, Theme } from "utils";
import {
  CreateForm,
  CreateSVGDisplay,
  Container,
  Create,
  Title,
} from "components";
import CreateContainer from "components/Create";

const ipfsClient = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateView() {
  const router = useRouter();
  const svgRef = useRef(null);
  const defaultFormData = {
    backgroundColor: Theme.colors.ui.dark,
    description: "",
    firstLine: "",
    fontFamily: "Hahmlet",
    fontWeight: "Medium",
    name: "",
    secondLine: "",
    textColor: Theme.colors.text.default,
    thirdLine: "",
  };
  // TODO swap with defaultFormData
  const testFormData = {
    backgroundColor: Theme.colors.ui.dark,
    description: "Test description.",
    firstLine: "First line of Haikoin",
    fontFamily: "Hahmlet",
    fontWeight: "Medium",
    name: "Test Name",
    secondLine: "Second line of the Haikoin",
    textColor: Theme.colors.text.default,
    thirdLine: "Third line of Haikoin",
  };

  const [uploadingToIPFS, setUploadingToIPFS] = useState(false);
  const [formData, setFormData] = useState(testFormData);

  async function mintHaikoin(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const haikoinTokenContract = new ethers.Contract(
      Config.haikoinTokenContractAddress,
      HaikoinTokenContract.abi,
      signer
    );
    const createTokenResponse = await haikoinTokenContract.mint(url);
    await createTokenResponse.wait();
  }

  async function handleCreate() {
    const { name, description } = formData;

    function getImageFromSvg() {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = 2000;
        canvas.height = 2000;
        const canvasContext = canvas.getContext("2d");
        const tempImage = document.createElement("img");

        tempImage.onload = () => {
          canvasContext.drawImage(tempImage, 0, 0);

          const ipfsPackage = JSON.stringify({
            name,
            description,
            image: canvas.toDataURL("image/png"),
          });

          resolve(ipfsPackage);
        };

        tempImage.onError = reject;
        tempImage.setAttribute(
          "src",
          "data:image/svg+xml;base64," + btoa(svgRef.current.outerHTML)
        );
      });
    }

    try {
      setUploadingToIPFS(true);

      // Convert SVG to PNG image and upload to IPFS
      const ipfsPackage = await getImageFromSvg();
      const ipfsResult = await ipfsClient.add(ipfsPackage);

      setUploadingToIPFS(false);

      const ipfsPath = `https://ipfs.infura.io/ipfs/${ipfsResult.path}`;

      // After file is uploaded to IPFS, pass the URL to save it on Polygon
      await mintHaikoin(ipfsPath);

      router.push(Routes.dashboard);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <Container>
      <CreateContainer.GlobalStyles />
      <Head>
        <title>Create | {Config.siteTitle}</title>
      </Head>

      <Title>
        <MagicWandIcon />
        <h1>Create</h1>
      </Title>

      <Create>
        <CreateSVGDisplay {...formData} svgRef={svgRef} />

        <CreateForm
          formData={formData}
          setFormData={setFormData}
          onCreateClick={handleCreate}
          uploadingToIPFS={uploadingToIPFS}
        />
      </Create>
    </Container>
  );
}
