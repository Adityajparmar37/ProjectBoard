const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");



const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

async function putObject(projectName, filename, contentType, body) {
    const key = `${projectName}/${filename}`;

    const command = new PutObjectCommand({
        Bucket: "projectboard-upload",
        Key: key,
        ContentType: contentType,
        Body: body,
    });

    const url = await getSignedUrl(s3Client, command);
    await s3Client.send(command);
    return url;
}

async function getObjectURl(projectName, filename) {
    const key = `${projectName}/${filename}`;

    const command = new GetObjectCommand({
        Bucket: "projectboard-upload",
        Key: key,
    });

    const url = await getSignedUrl(s3Client, command);
    return url;
}

async function listObjects(projectName) {
    const prefix = `${projectName}/`;

    const command = new ListObjectsV2Command({
        Bucket: "projectboard-upload",
        Prefix: prefix,
    });

    const result = await s3Client.send(command);
    console.log(result);
}

module.exports = {
    putObject,
    getObjectURl,
    listObjects,
};
