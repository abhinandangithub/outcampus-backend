SET mobile_jwtPrivateKey=securekey

// to rin test cases
SET NODE_ENV=test

npm install -g node-inspector
node-debug app.js

node --prof ./app.js
node --prof-process ./the-generated-log-file

const dns = require('dns');  
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {  
  console.log(hostname, service);  
    // Prints: localhost  
}); 