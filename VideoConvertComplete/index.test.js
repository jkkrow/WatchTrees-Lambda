const { handler } = require('./index');

const event = {
  version: '0',
  'detail-type': 'MediaConvert Job State Change',
  source: 'aws.mediaconvert',
  region: 'ap-northeast-2',
  detail: {
    status: 'COMPLETE',
    userMetadata: {
      application: 'WatchTrees',
      key: 'videos/619f36a27e1eb4b512caae36/627b5fb5521a5118d8038963/Test/Test',
      fileName: 'Test.mp4',
      treeId: '627b5fb5521a5118d8038963',
    },
  },
};

console.log('Test start');

handler(event);
