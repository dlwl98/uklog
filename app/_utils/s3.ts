import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function putObject(objectName: string, file: File) {
  const fileBuffer = await file.arrayBuffer();

  return s3
    .putObject({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: objectName,
      ACL: 'public-read',
      Body: Buffer.from(fileBuffer),
    })
    .promise();
}
