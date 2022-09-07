// Native API Param Types
import Moralis from "moralis";

export type getBlockParams = Parameters<typeof Moralis.EvmApi.native.getBlock>[0];
export type getContractEventsParams = Parameters<typeof Moralis.EvmApi.native.getContractEvents>[0];
export type getDateToBlockParams = Parameters<typeof Moralis.EvmApi.native.getDateToBlock>[0];
export type getLogsByAddressParams = Parameters<typeof Moralis.EvmApi.native.getLogsByAddress>[0];
export type getNFTTransfersByBlockParams = Parameters<typeof Moralis.EvmApi.native.getNFTTransfersByBlock>[0];
export type getTransactionParams = Parameters<typeof Moralis.EvmApi.native.getTransaction>[0];
export type runContractFunctionParams = Parameters<typeof Moralis.EvmApi.native.runContractFunction>[0];