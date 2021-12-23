import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useState } from "react";
import { syllable } from "syllable";
import Web3Modal from "web3modal";
import * as ReactPopover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";
import { CaretDownIcon, MagicWandIcon } from "@radix-ui/react-icons";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

import { Config, Fonts } from "../utils";
import {
  Button,
  CreateSVGDisplay,
  StyledContainer,
  StyledCreate,
  StyledTitle,
} from "../components";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formData, setFormData] = useState({
    backgroundColor: "#000000",
    description: "",
    firstLine: "",
    fontFamily: "Work Sans",
    fontWeight: "Regular",
    name: "",
    price: "",
    secondLine: "",
    textColor: "#FFFFFF",
    thirdLine: "",
  });

  const router = useRouter();

  const handleInputChange = (event) => {
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

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
      <StyledTitle>
        <h1>
          <MagicWandIcon /> Create
        </h1>
      </StyledTitle>

      <StyledCreate>
        <form className="form">
          <label htmlFor="firstLine">
            First Line{" "}
            <span>{syllable(formData.firstLine)} of 5 syllables</span>
          </label>
          <input
            id="firstLine"
            name="firstLine"
            placeholder="First line of Haikoin"
            onChange={handleInputChange}
          />

          <label htmlFor="secondLine">
            Second Line{" "}
            <span>{syllable(formData.secondLine)} of 7 syllables</span>
          </label>
          <input
            id="secondLine"
            name="secondLine"
            placeholder="Second line of the Haikoin"
            onChange={handleInputChange}
          />

          <label htmlFor="thridLine">
            Third Line{" "}
            <span>{syllable(formData.thirdLine)} of 5 syllables</span>
          </label>
          <input
            id="thirdLine"
            name="thirdLine"
            placeholder="Third line of Haikoin"
            onChange={handleInputChange}
          />

          <label htmlFor="name">Name of your Haikoin</label>
          <input
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
          />

          <label htmlFor="description">Description of your Haikoin</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
          />

          <div className="fields">
            <div className="control">
              <label>Font Family:</label>
              <ReactPopover.Root>
                <ReactPopover.Trigger>
                  <div className="select">
                    {formData.fontFamily}
                    <CaretDownIcon />
                  </div>
                </ReactPopover.Trigger>
                <ReactPopover.Content>
                  <ul
                    className="list"
                    onClick={(event) =>
                      setFormData((state) => ({
                        ...state,
                        fontFamily: event.target.innerText,
                      }))
                    }
                  >
                    {Fonts.map((font) => (
                      <li key={font}>{font}</li>
                    ))}
                  </ul>
                </ReactPopover.Content>
              </ReactPopover.Root>
            </div>

            <div className="control">
              <label>Font Weight:</label>
              <ReactPopover.Root>
                <ReactPopover.Trigger>
                  <div className="select">
                    {formData.fontWeight}
                    <CaretDownIcon />
                  </div>
                </ReactPopover.Trigger>
                <ReactPopover.Content>
                  <ul
                    className="list"
                    onClick={(event) =>
                      setFormData((state) => ({
                        ...state,
                        fontWeight: event.target.innerText,
                      }))
                    }
                  >
                    <li>Light</li>
                    <li>Regular</li>
                    <li>Bold</li>
                  </ul>
                </ReactPopover.Content>
              </ReactPopover.Root>
            </div>

            <div className="control">
              <label>Background Color:</label>
              <ReactPopover.Root>
                <ReactPopover.Trigger>
                  <div
                    className="color"
                    style={{ backgroundColor: formData.backgroundColor }}
                  />
                </ReactPopover.Trigger>
                <ReactPopover.Content>
                  <HexColorPicker
                    color={formData.backgroundColor}
                    onChange={(color) =>
                      setFormData((state) => ({
                        ...state,
                        backgroundColor: color,
                      }))
                    }
                  />
                </ReactPopover.Content>
              </ReactPopover.Root>
            </div>

            <div className="control">
              <label>Text Color:</label>
              <ReactPopover.Root>
                <ReactPopover.Trigger>
                  <div
                    className="color"
                    style={{ backgroundColor: formData.textColor }}
                  />
                </ReactPopover.Trigger>
                <ReactPopover.Content>
                  <HexColorPicker
                    color={formData.textColor}
                    onChange={(color) =>
                      setFormData((state) => ({
                        ...state,
                        textColor: color,
                      }))
                    }
                  />
                </ReactPopover.Content>
              </ReactPopover.Root>
            </div>
          </div>

          <div className="fields">
            <div>
              <label htmlFor="price">Selling price (in Eth)</label>
              <input
                id="price"
                name="price"
                placeholder=".025"
                type="number"
                onChange={handleInputChange}
              />
            </div>

            <Button onClick={createNFT}>Create Digital Asset</Button>
          </div>
        </form>

        <CreateSVGDisplay formData={formData} />
      </StyledCreate>
    </StyledContainer>
  );
}
