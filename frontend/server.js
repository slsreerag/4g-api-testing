var awsIot = require('aws-iot-device-sdk');
const request = require('request')

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts 
// to connect with a client identifier which is already in use, the existing 
// connection will be terminated.
//
var device = awsIot.device({
  keyPath: '4810-private.pem.key',
  certPath: '4810-certificate.pem.crt',
  caPath: '4810-AmazonRootCA1.pem',
  clientId: '48IO_device_thing',
  host: 'a7sp28llxpngy-ats.iot.us-east-1.amazonaws.com'

});

var contents = "starts";

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function () {
    console.log('connect');
    //device.subscribe('topic_1');
    // device.publish('sec1', JSON.stringify({ test_data: 'NodeJS server connected...'}));
  });

device
  .on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
  });


function CallApi() {
  const url = "http://4gapitestingbackend.oricoms.com/api/get_device_details";
  request({ url: url }, (error, response) => {
if (response && response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {    
if (response?.body) {
      try {
        const data = JSON?.parse(response?.body);
        if (Array?.isArray(data)) {
          data?.forEach((elem) => {
            const id = elem?.device_id;
            device?.publish(id, JSON?.stringify(elem));
          });
        } else {
          console.error("Response is not an array:", data);
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    } else {
      console.error("Response body is null or undefined");
    }
}
  else{
    console.error("Response body is not json");
  }
  });
}


setInterval(() => {
  CallApi();
}, 1000);

CallApi();

function CallApiHourly() {
  const url = "http://4gapitestingbackend.oricoms.com/api/get_device_hourly_response";
  request({ url: url }, (error, response) => {
if (response && response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {    
if (response?.body) {
      try {
        const data = JSON?.parse(response?.body);
        if (Array?.isArray(data)) {
          data?.forEach((elem) => {
            const id = elem?.device_id;
            device?.publish(id, JSON?.stringify(elem));
          });
        }
        else {
          console.error("Response is not an array:", data);
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
      }
    } else {
      console.error("Response body is null or undefined");
    }
}
  else{
    console.error("Response body is not json");
  }
  });
}

setInterval(() => {
  CallApiHourly();
}, 3600000);

CallApiHourly();
