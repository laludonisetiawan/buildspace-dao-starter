import sdk from "./1-initialize-sdk.js";
import {readFileSync} from "fs";

const editionDrop = sdk.getEditionDrop("0x0FbdC4Dd63847DFDCd3648bC0EFF025d7572d8c0");

(async () => {
    try {
      await editionDrop.createBatch([
        {
          name: "Komunitas LBS #1",
          description: "This NFT will give you access to LBS DAO!",
          image: readFileSync("scripts/assets/stiker.png"),
        },
      ]);
      console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
      console.error("failed to create the new NFT", error);
    }
  })();