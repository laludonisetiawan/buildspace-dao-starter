import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// Ini adalah kontrak tata kelola kita.
const vote = sdk.getVote("0xf69a71A0Ec366770698F5Fc625641777Ab1a8d20");


// Ini adalah kontrak ERC-20 kita.
const token = sdk.getToken("0x3E732cFAe2bF13D3c721C02EE63bA3442aE35046");

(async () => {
  try {
    // Buat proposal untuk mencetak 420.000 token baru ke perbendaharaan.
    const amount = 420_000;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token.getAddress(),
        // Token asli kita adalah ETH.  nativeTokenValue adalah jumlah ETH yang kita inginkan
         // untuk mengirimkan proposal ini.  Dalam hal ini, kami mengirim 0 ETH.
         // Kami baru saja mencetak token baru ke perbendaharaan.  Jadi, atur ke 0.
        nativeTokenValue: 0,
        // Kami sedang membuat mint!  Dan, kami sedang melakukan pemungutan suara, yaitu
         // bertindak sebagai perbendaharaan kita.
         // dalam hal ini, kita perlu menggunakan eters.js untuk mengonversi jumlah
         // ke format yang benar.  Ini karena jumlah yang dibutuhkan ada di wei.
        transactionData: token.encoder.encode(
          "mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]
        ),
      }
    ];

    await vote.propose(description, executions);

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    // Buat proposal untuk mentransfer sendiri 6.900 token karena menjadi luar biasa.
    const amount = 6_900;
    const description = "Should the DAO transfer " + amount + " tokens from the treasury to " +
      process.env.WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        // Sekali lagi, kami mengirimkan diri kami 0 ETH.  Hanya mengirim token kita sendiri.
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
          // Sekali lagi, kami mengirimkan diri kami 0 ETH.  Hanya mengirim token kita sendiri.
          "transfer",
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: token.getAddress(),
      },
    ];

    await vote.propose(description, executions);

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();