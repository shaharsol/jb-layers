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


  /*

sync all northwind images to localstack s3

export AWS_ACCESS_KEY_ID="test"
export AWS_SECRET_ACCESS_KEY="test"
export AWS_DEFAULT_REGION="us-east-1"


aws --endpoint-url=http://localhost:4566 s3 sync ~/Desktop/images/ s3://test.shaharsol.com

sql update all image names
in 2nd thought maybe not do it, we just need the image name and concat it to the server prefix which is  http://localhost:4566/test.shaharsol.com/
update products
set ImageName = CONCAT('http://localhost:4566/test.shaharsol.com/',ImageName)
where ImageName not like 'http%';

  */