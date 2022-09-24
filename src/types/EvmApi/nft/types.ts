// NFT API Param and Result Types
import Moralis from "moralis";

export type getContractNFTsParams = Parameters< typeof Moralis.EvmApi.nft.getContractNFTs >[0];
export type getNFTContractMetadataParams = Parameters< typeof Moralis.EvmApi.nft.getNFTContractMetadata >[0];
export type getNFTContractTransfersParams = Parameters< typeof Moralis.EvmApi.nft.getNFTContractTransfers >[0];
export type getNFTLowestPriceParams = Parameters< typeof Moralis.EvmApi.nft.getNFTLowestPrice >[0];
export type getNFTMetadataParams = Parameters< typeof Moralis.EvmApi.nft.getNFTMetadata >[0];
export type getNFTOwnersParams = Parameters< typeof Moralis.EvmApi.nft.getNFTOwners >[0];
export type getNFTTokenIdOwnersParams = Parameters< typeof Moralis.EvmApi.nft.getNFTTokenIdOwners >[0];
export type getNFTTradesParams = Parameters< typeof Moralis.EvmApi.nft.getNFTTrades >[0];
export type getNFTTransfersParams = Parameters< typeof Moralis.EvmApi.nft.getNFTTransfers >[0];
export type getNFTTransfersByBlockParams = Parameters< typeof Moralis.EvmApi.nft.getNFTTransfersByBlock >[0];
export type getNFTTransfersFromToBlockParams = Parameters< typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock >[0];
export type getWalletNFTCollectionsParams = Parameters< typeof Moralis.EvmApi.nft.getWalletNFTCollections >[0];
export type getWalletNFTTransfersParams = Parameters< typeof Moralis.EvmApi.nft.getWalletNFTTransfers >[0];
export type getWalletNFTsParams = Parameters< typeof Moralis.EvmApi.nft.getWalletNFTs >[0];
export type reSyncMetadataParams = Parameters< typeof Moralis.EvmApi.nft.reSyncMetadata >[0];
export type searchNFTsParams = Parameters< typeof Moralis.EvmApi.nft.searchNFTs >[0];
export type syncNFTContractParams = Parameters< typeof Moralis.EvmApi.nft.syncNFTContract >[0];

export type getContractNFTsResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getContractNFTs >>, 'result'>['result'];
export type getNFTContractMetadataResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTContractMetadata >>, 'result'>['result'];
export type getNFTContractTransfersResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTContractTransfers >>, 'result'>['result'];
export type getNFTLowestPriceResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTLowestPrice >>, 'result'>['result'];
export type getNFTMetadataResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTMetadata >>, 'result'>['result'];
export type getNFTOwnersResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTOwners >>, 'result'>['result'];
export type getNFTTokenIdOwnersResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTTokenIdOwners >>, 'result'>['result'];
export type getNFTTradesResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTTrades >>, 'result'>['result'];
export type getNFTTransfersResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTTransfers >>, 'result'>['result'];
export type getNFTTransfersByBlockResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTTransfersByBlock >>, 'result'>['result'];
export type getNFTTransfersFromToBlockResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock >>, 'result'>['result'];
export type getWalletNFTCollectionsResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getWalletNFTCollections >>, 'result'>['result'];
export type getWalletNFTTransfersResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getWalletNFTTransfers >>, 'result'>['result'];
export type getWalletNFTsResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.getWalletNFTs >>, 'result'>['result'];
export type reSyncMetadataResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.reSyncMetadata >>, 'result'>['result'];
export type searchNFTsResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.searchNFTs >>, 'result'>['result'];
export type syncNFTContractResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.nft.syncNFTContract >>, 'result'>['result'];