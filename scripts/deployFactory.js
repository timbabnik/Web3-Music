const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Replace this line with the actual address of your deployed Verify contract
  const verifyContractAddress = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788"; // Replace with the actual address

  // Deploy MusicFactory contract with the Verify contract address
  const MusicFactory = await ethers.getContractFactory("MusicFactory");
  const musicFactory = await MusicFactory.deploy(verifyContractAddress);

  console.log("Deploying MusicFactory...");

  // Wait for the contract to be mined and get the deployed address
  await musicFactory.deployed();

  console.log("MusicFactory contract deployed to:", musicFactory.address);
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
