design-patterns-for-blockchain
class lab and assignments


local-to-ipfs-display requires the following
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



