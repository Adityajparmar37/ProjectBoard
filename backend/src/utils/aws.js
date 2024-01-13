const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command,DeleteObjectCommand } = require("@aws-sdk/client-s3");

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

    await s3Client.send(command);

    // Construct the public URL directly without signing
    const url = `https://projectboard-upload.s3.ap-south-1.amazonaws.com/${encodeURIComponent(key)}`;

    return url;
}

async function getObjectURL(projectName, filename) {
    const key = `${projectName}/${filename}`;

    // Construct the public URL directly without signing
    const url = `https://projectboard-upload.s3.ap-south-1.amazonaws.com/${encodeURIComponent(key)}`;
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

async function deleteObject(projectName, filename) {
    const key = `${projectName}/${filename}`;

    const command = new DeleteObjectCommand({
        Bucket: "projectboard-upload",
        Key: key,
    });

    await s3Client.send(command);
}

module.exports = {
    putObject,
    getObjectURL,
    listObjects,
    deleteObject,
};
