// Resolve API Param and Result Types
import Moralis from "moralis";

export type resolveAddressParams = Parameters< typeof Moralis.EvmApi.resolve.resolveAddress >[0];
export type resolveDomainParams = Parameters< typeof Moralis.EvmApi.resolve.resolveDomain >[0];

export type resolveAddressResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.resolve.resolveAddress >>, 'result'>['result'];
export type resolveDomainResult = Pick<Awaited<ReturnType< typeof Moralis.EvmApi.resolve.resolveDomain >>, 'result'>['result'];