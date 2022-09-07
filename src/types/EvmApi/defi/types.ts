// DeFi API Param Types
import Moralis from "moralis";

export type getPairAddressParams = Parameters<typeof Moralis.EvmApi.defi.getPairAddress>[0];
export type getPairReservesParams = Parameters<typeof Moralis.EvmApi.defi.getPairReserves>[0];