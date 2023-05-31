// export const contractAddress = '0xEe03D17C14A432cD1b9bE152195D5f63919803e5';
export const contractAddress = '0xbee645F3F08cC369e0CFbf87390583d91C9Ce76b';
export const contractABI = [
	{
		'inputs': [],
		'stateMutability': 'nonpayable',
		'type': 'constructor'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'owner',
				'type': 'address'
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'approved',
				'type': 'address'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'Approval',
		'type': 'event'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'owner',
				'type': 'address'
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'operator',
				'type': 'address'
			},
			{
				'indexed': false,
				'internalType': 'bool',
				'name': 'approved',
				'type': 'bool'
			}
		],
		'name': 'ApprovalForAll',
		'type': 'event'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			},
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'approve',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'string',
				'name': '_name',
				'type': 'string'
			},
			{
				'internalType': 'string',
				'name': '_image',
				'type': 'string'
			},
			{
				'internalType': 'uint256',
				'name': '_price',
				'type': 'uint256'
			},
			{
				'internalType': 'string',
				'name': '_description',
				'type': 'string'
			}
		],
		'name': 'createNFT',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'previousOwner',
				'type': 'address'
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'newOwner',
				'type': 'address'
			}
		],
		'name': 'OwnershipTransferred',
		'type': 'event'
	},
	{
		'inputs': [],
		'name': 'pause',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': false,
				'internalType': 'address',
				'name': 'account',
				'type': 'address'
			}
		],
		'name': 'Paused',
		'type': 'event'
	},
	{
		'inputs': [],
		'name': 'renounceOwnership',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			}
		],
		'name': 'safeMint',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'from',
				'type': 'address'
			},
			{
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			},
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'safeTransferFrom',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'from',
				'type': 'address'
			},
			{
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			},
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			},
			{
				'internalType': 'bytes',
				'name': 'data',
				'type': 'bytes'
			}
		],
		'name': 'safeTransferFrom',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'operator',
				'type': 'address'
			},
			{
				'internalType': 'bool',
				'name': 'approved',
				'type': 'bool'
			}
		],
		'name': 'setApprovalForAll',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'from',
				'type': 'address'
			},
			{
				'indexed': true,
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'Transfer',
		'type': 'event'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'from',
				'type': 'address'
			},
			{
				'internalType': 'address',
				'name': 'to',
				'type': 'address'
			},
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'transferFrom',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'newOwner',
				'type': 'address'
			}
		],
		'name': 'transferOwnership',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'unpause',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': false,
				'internalType': 'address',
				'name': 'account',
				'type': 'address'
			}
		],
		'name': 'Unpaused',
		'type': 'event'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'owner',
				'type': 'address'
			}
		],
		'name': 'balanceOf',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'getApproved',
		'outputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': '_tokenId',
				'type': 'uint256'
			}
		],
		'name': 'getNFT',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			},
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			},
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			},
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'owner',
				'type': 'address'
			},
			{
				'internalType': 'address',
				'name': 'operator',
				'type': 'address'
			}
		],
		'name': 'isApprovedForAll',
		'outputs': [
			{
				'internalType': 'bool',
				'name': '',
				'type': 'bool'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'MINT_PRICE',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'name',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'owner',
		'outputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'ownerOf',
		'outputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'paused',
		'outputs': [
			{
				'internalType': 'bool',
				'name': '',
				'type': 'bool'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'bytes4',
				'name': 'interfaceId',
				'type': 'bytes4'
			}
		],
		'name': 'supportsInterface',
		'outputs': [
			{
				'internalType': 'bool',
				'name': '',
				'type': 'bool'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'symbol',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'index',
				'type': 'uint256'
			}
		],
		'name': 'tokenByIndex',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': 'owner',
				'type': 'address'
			},
			{
				'internalType': 'uint256',
				'name': 'index',
				'type': 'uint256'
			}
		],
		'name': 'tokenOfOwnerByIndex',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'tokenURI',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'totalSupply',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	}
];
