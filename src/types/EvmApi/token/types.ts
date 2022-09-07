// Token API Param Types
import Moralis from "moralis";

export type getAllTokenIdsParams = Parameters<typeof Moralis.EvmApi.token.getAllTokenIds>[0];
export type getContractNFTTransfersParams = Parameters<typeof Moralis.EvmApi.token.getContractNFTTransfers>[0];
export type getNFTLowestPriceParams = Parameters<typeof Moralis.EvmApi.token.getNFTLowestPrice>[0];
export type getNFTMetadataParams = Parameters<typeof Moralis.EvmApi.token.getNFTMetadata>[0];
export type getNFTOwnersParams = Parameters<typeof Moralis.EvmApi.token.getNFTOwners>[0];
export type getNFTTradesParams = Parameters<typeof Moralis.EvmApi.token.getNFTTrades>[0];
export type getNftTransfersFromToBlockParams = Parameters<typeof Moralis.EvmApi.token.getNftTransfersFromToBlock>[0];
export type getTokenAddressTransfersParams = Parameters<typeof Moralis.EvmApi.token.getTokenAddressTransfers>[0];
export type getTokenAllowanceParams = Parameters<typeof Moralis.EvmApi.token.getTokenAllowance>[0];
export type getTokenIdMetadataParams = Parameters<typeof Moralis.EvmApi.token.getTokenIdMetadata>[0];
export type getTokenIdOwnersParams = Parameters<typeof Moralis.EvmApi.token.getTokenIdOwners>[0];
export type getTokenMetadataParams = Parameters<typeof Moralis.EvmApi.token.getTokenMetadata>[0];
export type getTokenMetadataBySymbolParams = Parameters<typeof Moralis.EvmApi.token.getTokenMetadataBySymbol>[0];
export type getTokenPriceParams = Parameters<typeof Moralis.EvmApi.token.getTokenPrice>[0];
export type getWalletTokenIdTransfersParams = Parameters<typeof Moralis.EvmApi.token.getWalletTokenIdTransfers>[0];
export type reSyncMetadataParams = Parameters<typeof Moralis.EvmApi.token.reSyncMetadata>[0];
export type searchNFTsParams = Parameters<typeof Moralis.EvmApi.token.searchNFTs>[0];