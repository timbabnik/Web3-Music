const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Replace this line with the actual address of your deployed Verify contract
  const verifyContractAddress = "0x4531b410189723d8789E662B20658B14eab859c6"; // Replace with the actual address

  // Deploy MusicFactory contract with the Verify contract address
  const MusicFactory = await ethers.getContractFactory("MusicFactory");
  const musicFactory = await MusicFactory.deploy(verifyContractAddress);

  console.log("Deploying MusicFactory...");

  // Wait for the contract to be mined and get the deployed address
  await musicFactory.waitForDeployment();

  console.log("MusicFactory contract deployed to:", musicFactory.target);
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
