require('dotenv').config();

const { handler } = require('./index');

const event = {
  Records: [
    {
      eventVersion: '2.1',
      eventSource: 'aws:s3',
      awsRegion: 'ap-northeast-2',
      eventName: 'ObjectCreated:CompleteMultipartUpload',
      s3: {
        bucket: {
          name: 'wt-vod-source',
          arn: 'arn:aws:s3:::wt-vod-source',
        },
        object: {
          key: 'videos/619f36a27e1eb4b512caae36/627b5fb5521a5118d8038963/Test.mp4',
          size: 3239021,
        },
      },
    },
  ],
};

console.log('Test start');

handler(event);
