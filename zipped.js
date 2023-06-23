const aws = require('aws-sdk');
const JSZip = require('jszip');
const zip = new JSZip();
const s3 = new aws.S3();
const folder = zip.folder('test');
const bucketName = 'kevinms-bucket';
const key = 'testFile.zip';
const doWork = async () => {
	folder.file('test2.txt', 'hello world\n');
	folder.file('test3.txt', 'hello again\n');
	const contents = await folder.generateAsync({ type: 'nodeBuffer' });

	let params = {
		Bucket: bucketName,
		Key: key,
		Body: contents,
	};
  const resposne = await s3.putObject(params).promise();
  const url = s3.getSignedUrl('getObject',{Bucket: bucketName, Key: key});
  console.log(`The URL is: ${url}`);
};

doWork();
