const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ResearchPaperNFTModule", (m) => {
    // Using placeholder values for initial deployment
    const contract = m.contract("ResearchPaperNFT", [
        "ResearchPaperNFT",  // default name
        "RPN",               // default symbol
        "0xB64f6A326D269201434432d1721cb48152bf40ee"
    ]);
    return { contract };
});