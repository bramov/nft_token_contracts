import { ethers, run } from "hardhat";
import {VSHBNFT__factory, VSHBToken__factory} from "../typechain-types";

async function main() {
    const [signer] = await ethers.getSigners()
    const vshbToken = await new VSHBToken__factory(signer).deploy()
    await vshbToken.deployed()
    console.log('VSHBToken deployed to:', vshbToken.address)

    const vshbNFT = await new VSHBNFT__factory(signer).deploy()
    await vshbNFT.deployed()
    console.log('VSHBNFT deployed to:', vshbNFT.address)

    await vshbNFT.safeMint(
        signer.address,
        'https://ipfs.io/ipfs/QmebBLkXMTKewtzat2Z6U5EwTttkcGrZF5Ama8F41ZPku5?filename=photo_2022-11-09%2017.35.27.jpeg'
    )

    await run('verify:verify', {
        address: vshbToken.address,
        contract: 'contracts/VSHBToken.sol:VSHBToken'
    })

    await run('verify:verify', {
        address: vshbNFT.address,
        contract: 'contracts/VSHBNFT.sol:VSHBNFT'
    })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
