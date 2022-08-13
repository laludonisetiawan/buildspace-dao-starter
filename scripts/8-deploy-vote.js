import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
      const voteContractAddress = await sdk.deployer.deployVote({
        // Beri nama kontrak tata kelola Anda.
        name: "LBS DAO",
  
        // Ini adalah lokasi token tata kelola kami, kontrak ERC-20 kami!
        voting_token_address: "0xf13DF481D230f3EbeF54Af2F4EA41103B1F2EAfF",
  
        // Parameter ini ditentukan dalam jumlah blok. 
       // Dengan asumsi waktu blok sekitar 13,14 detik (untuk Ethereum)

       // Setelah proposal dibuat, kapan anggota dapat mulai memberikan suara?
       // Untuk saat ini, kami mengatur ini segera.
        voting_delay_in_blocks: 0,
  
        // Berapa lama anggota harus memilih proposal saat dibuat?
       // kita akan mengaturnya menjadi 1 hari = 6570 blok
        voting_period_in_blocks: 6570,
  
        // The minimum % of the total supply that need to vote for
      // the proposal to be valid after the time for the proposal has ended.
        voting_quorum_fraction: 0,
  
        // Berapa jumlah minimum token yang dibutuhkan pengguna untuk dapat membuat proposal?
       // Saya menyetelnya ke 0. Artinya, tidak ada token yang diperlukan pengguna untuk diizinkan
       // membuat proposal.
        proposal_token_threshold: 0,
      });
  
      console.log(
        "✅ Successfully deployed vote contract, address:",
        voteContractAddress,
      );
    } catch (err) {
      console.error("Failed to deploy vote contract", err);
    }
  })();