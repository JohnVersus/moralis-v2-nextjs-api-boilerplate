const a = {
  ETH_MAINNET: "0x1",
  ETH_ROPSTEN: "0x3",
  ETH_GOERLI: "0x5",
  ETH_KOVAN: "0x2a",
  ETH_RINKEBY: "0x4",
  ETH_LOCALDEVCHAIN: "0x539",
  POLYGON_MAINNET: "0x89",
  POLYGON_MUMBAI: "0x13881",
  BSC_MAINNET: "0x38",
  BSC_TESTNET: "0x61",
  AVAX_MAINNET: "0xa86a",
  AVAX_TESTNET: "0xa869",
  FANTOM_MAINNET: "0xfa",
  CRONOS_MAINNET: "0x19",
  CRONOS_TESTNET: "0x152",
};

function getChainName(num) {
  for (let key of Object.keys(a)) {
    hex = `0x${num.toString(16)}`;
    if (a[key] == hex) {
      return key;
    } else {
      return "ETH_MAINNET";
    }
  }
}

export default getChainName;