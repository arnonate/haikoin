// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Deploy market contract
  const marketFactory = await hre.ethers.getContractFactory("HaikoinMarket");
  const marketContract = await marketFactory.deploy();
  await marketContract.deployed();

  console.log("HaikoinMarket deployed to:", marketContract.address);

  // Deploy token contract
  const tokenFactory = await hre.ethers.getContractFactory("HaikoinToken");
  const tokenContract = await tokenFactory.deploy();
  await tokenContract.deployed();

  console.log("HaikoinToken deployed to:", tokenContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
