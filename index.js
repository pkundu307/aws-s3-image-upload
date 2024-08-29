const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "region of the bucket",
  credentials: {

    accessKeyId: "your access id",
    secretAccessKey: "your secret access key",
  }
});

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: "bucket name",
    Key: key
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return url;
  } catch (error) {
    console.error("Error getting signed URL:", error);
  }
}

async function putObjectUrl(filename,contentType){
const command = new PutObjectCommand({
    Bucket: "checksbucket",
    Key: `upload/${filename}`,
    ContentType: contentType
  });   
  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function init() {
  const imageUrl = await getObjectUrl(`path/filename.jpeg`);
  console.log("URL for image:", imageUrl);

// console.log('url for uploading', await putObjectUrl(`image-${Date.now()}.jpeg`,'image/jpeg'));
//use when creating a new image
}

init();
