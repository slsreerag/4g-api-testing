var awsIot = require('aws-iot-device-sdk');
 
//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
   keyPath: '561-private.pem.key',
  certPath: '561-certificate.pem.crt',
    caPath: 'AmazonRootCA1.pem',
  clientId: 'react_thing',
  host: 'asm7iff9f19d4-ats.iot.us-east-1.amazonaws.com'
    
});

var contents = "starts";
 
//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function() {
    console.log('connect');
    //device.subscribe('topic_1');
    device.publish('demo/top2', JSON.stringify({ test_data: 'NodeJS server connected aws...',device_id:'24545',P1: "241",
    P2: "240",
    P3: "230",
    P8: "ON",
    P9: "ON",
    P10: "ON",
    P11: "OFF",
    P12: "OFF",}));
  });
 
device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });