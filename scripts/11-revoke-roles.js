import sdk from "./1-initialize-sdk.js";
const token = sdk.getToken("0x3E732cFAe2bF13D3c721C02EE63bA3442aE35046");

(async () => {
    try {
        // log the current roles.
        const allRoles = await token.roles.getAll();
        console.log(" Roles that exist right now:", allRoles);

        // revoke all the superpowers your wallet had over the ERC-20 contract.
        await token.roles.setAll({admin: [], minter: []});
        console.log(
            "Roles after revoking ourselves",
            await token.roles.getAll()
        );
        console.log(" sucessfuly revoked our superpowers from the ERC-20 contract");
    } catch (error) {
        console.log("failed to revoke ourselves from the DAO treasury", error);
    }
})();