import sdk from "./1-initialize-sdk.js";
import {MaxUint256} from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x986C9b90409D233Ca79976e5E131169166659668");

(async () => {
    try {
        const claimConditions = [{
            // kapan orang-orang bisa claim nft
            startTime: new Date(),
            // maks jumlah ntf yang bisa di klaim 
            maxQuantity: 50_000,
            // harga nft (gratis)
            price: 0,
            // the amount of nfts people can claim in one trx
            quantitiyLImitPerTransaction: 1,
            // We set the wait between transactions to MaxUint256, which means
            // people are only allowed to claim once.
            waitInSecond: MaxUint256,
        }]

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    } catch (error) {
        console.error("ada error breee", error);
    }
}) ();