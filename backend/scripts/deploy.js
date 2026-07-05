const hre = require("hardhat");

async function main() {

  const Staking = await hre.ethers.getContractFactory("Staking");

  const staking = await Staking.deploy();

  await staking.waitForDeployment();

  console.log(
    "Contract deployed to:",
    staking.target
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});