import stream from "stream";

import Aws from "aws-sdk";
import config from "config";

const hasBucket = async (bucket: string): Promise<boolean> => {
  const s3 = new Aws.S3(config.get("s3.options"));
  const options = {
    Bucket: bucket,
  };

  try {
    await s3.headBucket(options).promise();
    return true;
  } catch (error: unknown) {
    if ((error as Aws.AWSError).statusCode === 404) {
      return false;
    }

    throw error;
  }
};

export const upload = async (
  body: stream.Readable,
  key: string
): Promise<Aws.S3.ManagedUpload.SendData> => {
  const s3 = new Aws.S3(config.get("s3.options"));
  const bucket = config.get("s3.bucket") as string;

  if (!(await hasBucket(bucket))) {
    await s3
      .createBucket({
        Bucket: bucket,
      })
      .promise();
  }

  return s3
    .upload({
      Body: body,
      Bucket: bucket,
      Key: key,
    })
    .promise();
};

export const signedUrl = async (key: string): Promise<string> => {
  const s3 = new Aws.S3(config.get("s3.options"));

  return s3.getSignedUrlPromise("getObject", {
    Bucket: config.get("s3.bucket"),
    Key: key,
    Expires: 300,
  });
};
