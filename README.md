design-patterns-for-blockchain
  Class lab and assignments


local-to-ipfs-pic-display.js 
requires the following execution environment
  ipfs init
  ipfs daemon
  
  Set your IPFS so that other software can connect
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
    ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]

  Display the reference in your browser by putting in your address bar
    http://localhost:8080/ipfs/your_has_code_here

  
  create-react-app ipfstest

  npm install --save ipfs-http-client

    In your App.js
    const ipfsClient = require('ipfs-http-client')
    const ipfs = ipfsClient('http://localhost:5001')

       const ver = await ipfs.version()
       console.log("IPFS Version=", ver)

  Write a React app that can take an image file and add it to IPFS
  Display the file in the


ArtistAndArtwork.sol
  This is an assignment exercise to connect artist with the works
  It is an ERC721 implementation
  
  Create ERC-721 standard smart contract and mint non fungible tokens for that contract
  The artist is the owner and related to the owner's artwork 
  Can transfer ownership of work 

StockPriceVolume.sol
  A smart contract to set the stock price
  Get the stock price
  Retrieve the stock volume
  
  The implement a program in .js to connect to the
  stock exchange and to retrieve a stock and display the volume, price
  
  
  

