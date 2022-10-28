export interface StreamData {
  txs: Array<txs>;
  abi: Array<abi>;
  erc20Transfers: Array<erc20Transfers>;
  txsInternal: Array<txsInternal>;
  block: {
    number: string, 
    hash: string, 
    timestamp: string
  };
  nftApprovals: {
    ERC721: Array<ERC721>;
    ERC1155: Array<ERC1155>;
  };
  nftTransfers: Array<nftTransfers>;
  chainId: string;
  streamId: string;
  erc20Approvals: Array<erc20Approvals>;
  retries: number;
  tag: string;
  confirmed: boolean;
  logs: Array<logs>;
};

export interface txs {
  hash: string;
  gas: string | null;
  gasPrice: string | null;
  nonce: string | null;
  input: string | null;
  transactionIndex: string;
  fromAddress: string;
  toAddress: string | null;
  value: string | null;
  type: string | null;
  v: string | null;
  r: string | null;
  s: string | null;
  receiptCumulativeGasUsed: string | null;
  receiptGasUsed: string | null;
  receiptContractAddress: string | null;
  receiptRoot: string | null;
  receiptStatus: string | null;
}

export interface abi {
  anonymous?: boolean;
  constant?: boolean;
  inputs?: AbiInput[];
  name?: string;
  outputs?: AbiOutput[];
  payable?: boolean;
  stateMutability?: string;
  type: string;
  gas?: number;
}

export interface AbiInput {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiInput[];
  internalType?: string;
}

export interface AbiOutput {
  name: string;
  type: string;
  components?: AbiOutput[];
  internalType?: string;
}

export interface logs {
  logIndex: string;
  transactionHash: string;
  address: string;
  data: string;
  topic0: string | null;
  topic1: string | null;
  topic2: string | null;
  topic3: string | null;
}

export interface txsInternal {
  from: string | null;
  to: string | null;
  value: string | null;
  transactionHash: string;
  gas: string | null;

}

export interface RootLog {
  transactionHash: string;
  contract: string;
  logIndex: string;
}
export interface IERC20TransferDecodeLog {
  from: string;
  to: string;
  value: string;
}
export interface IERC20Metadata {
  tokenDecimals: string;
  tokenName: string;
  tokenSymbol: string;
  valueWithDecimals?: string;
}
export interface erc20Transfers extends RootLog, IERC20TransferDecodeLog, IERC20Metadata {}

export interface INFTApproval1155DecodeLog {
  account: string;
  operator: string;
  approved: boolean;
}
export interface INFTApproval721DecodeLog {
  owner: string;
  approved: string;
  tokenId: string;
}
export interface INFTMetadata {
  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;
}

export interface ERC721 extends RootLog, INFTApproval721DecodeLog, INFTMetadata {}

export interface ERC1155 extends RootLog, INFTApproval1155DecodeLog, INFTMetadata {}

export interface nftTransfers extends RootLog, INFTMetadata {
  operator: string | null;
  from: string;
  to: string;
  tokenId: string;
  amount: string;
}

export interface IERC20ApprovalDecodeLog {
  owner: string;
  spender: string;
  value: string;
}

export interface erc20Approvals extends RootLog, IERC20ApprovalDecodeLog, IERC20Metadata {}
