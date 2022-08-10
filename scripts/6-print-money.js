import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x3E732cFAe2bF13D3c721C02EE63bA3442aE35046");

(async () => {
    try {
        const amount = 1_000_000;
        await token.mintToSelf(amount);
        const totalSupply = await token.totalSupply();

        console.log("✅ There now is", totalSupply.displayValue, "$LBSDAO in circulation");
    } catch (error) {
        console.log("ada error bang: ", error);
    }
})();