// Resolve API Param Types
import Moralis from "moralis";

export type resolveAddressParams = Parameters<typeof Moralis.EvmApi.resolve.resolveAddress>[0];
export type resolveDomainParams = Parameters<typeof Moralis.EvmApi.resolve.resolveDomain>[0];