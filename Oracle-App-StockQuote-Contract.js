export const STOCK_ORACLE_ADDRESS = '0x9Dd1E8169E76A9226B07Ab9F85CC20a5e1eD44dd'

export const STOCK_ORACLE_ABI = [[
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			}
		],
		"name": "getStockVolume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "symbol",
				"type": "bytes4"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "volume",
				"type": "uint256"
			}
		],
		"name": "setStock",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]]

import Web3 from 'web3';
import {STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS} from './quotecontract'

const web3 = new Web3("http://localhost:7545")
const accounts = await web3.eth.getAccounts()
console.log("Account 0 = ", accounts[0])
const stockQuote = new web3.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS)

var retval = await stockQuote.methods.getStockPrice(web3.utils.fromAscii("AAAA")).call();
console.log(retval);
