const AWS = require("aws-sdk");
import { readFileSync } from "fs";
const s3 = new AWS.S3({
    accessKeyId: 'na',
    secretAccessKey: 'na',
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
  });

  async function uploadFile() {
    const params = {
      Bucket: 'test.shaharsol.com', // bucket you want to upload to
      Key: `fileupload/scanskill-${Date.now()}-glogo.png`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
      Body: readFileSync('./src/glogo.png', 'utf-8'),
      ACL: "public-read",
    };
    const data = await s3.upload(params).promise();
    return data.Location; // returns the url location
  }

  (async () => {
    const newFile = await uploadFile();
    console.log(newFile)
  })()