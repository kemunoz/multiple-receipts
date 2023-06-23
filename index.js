const aws = require('aws-sdk');

const s3 = new aws.S3();
const upload = async () => {
	let params = {
		Bucket: 'kevinms-bucket',
		Key: 'TestFolder2/',
		ACL: 'public-read',
		Body: '',
	};
	let fileparams = {
		Bucket: 'kevinms-bucket',
		Key: 'TestFolder2/text.txt',
		ACL: 'public-read',
		Body: 'Hello World',
	};
	let fileparams2 = {
		Bucket: 'kevinms-bucket',
		Key: 'TestFolder2/text2.txt',
		ACL: 'public-read',
		Body: 'Hello World2',
	};
	const folder = await s3.putObject(params).promise();
	const reponse = await Promise.all([
		s3.putObject(fileparams).promise(),
		s3.putObject(fileparams2).promise(),
	]);
	const url = await s3.getSignedUrlPromise('getObject', {
		Bucket: params.Bucket,
		Key: params.Key,
	});
	console.log(`This is the url: ${url}`);

  const objects = await s3.listObjects({Bucket: params.Bucket, Prefix: 'TestFolder2/'}).promise();
  console.log(objects);
};

upload();
