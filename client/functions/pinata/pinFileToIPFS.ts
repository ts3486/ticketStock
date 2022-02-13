//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { pinataApiKey, pinataSecretApiKey } = require("../secret.json");

export const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey, file, _metadata) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', fs.createReadStream(file));

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: _metadata.name,
        keyvalues: {
            price: _metadata.price
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    // const pinataOptions = JSON.stringify({
    //     cidVersion: 0,
    //     customPinPolicy: {
    //         regions: [
    //             {
    //                 id: 'FRA1',
    //                 desiredReplicationCount: 1
    //             },
    //             {
    //                 id: 'NYC1',
    //                 desiredReplicationCount: 2
    //             }
    //         ]
    //     }
    // });
    // data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
           console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};