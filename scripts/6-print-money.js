import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xf13DF481D230f3EbeF54Af2F4EA41103B1F2EAfF");

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