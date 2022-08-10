import sdk from "./1-initialize-sdk.js";
// ERC-1155 membership NFT contract.
const editionDrop = sdk.getEditionDrop("0x0FbdC4Dd63847DFDCd3648bC0EFF025d7572d8c0");

//  ERC-20 token contract.
const token = sdk.getToken("0x3E732cFAe2bF13D3c721C02EE63bA3442aE35046");

(async () => {
  try {
    
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",);
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();