import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote("0xf69a71A0Ec366770698F5Fc625641777Ab1a8d20");

const token = sdk.getToken("0x3E732cFAe2bF13D3c721C02EE63bA3442aE35046");

(async () => {
    try {
        await token.roles.grant("minter", vote.getAddress());
        console.log (
            "succesfuly gave vote contract permissions to act on token contract"
        );
    } catch (error) {
        console.error(
            "failed to grant vote contract permissions on token contract",
            error
        );
        process.exit(1);
    }
    try {
        const ownedTokenBalance = await token.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        await token.transfer(
            vote.getAddress(),
            percent90
        );
        console.log("✅ Successfully transferred " + percent90 + "token to vote contract");
    } catch (error) {
        console.error("failed to transfer tokens to vote contract", error);
    }
})();