const clientPromise = require('./config/db');
const { findVideoNodes, updateVideoNodes } = require('./lib/db');

exports.handler = async (event) => {
  console.log(JSON.stringify(event));

  const { EXT, APPLICATION } = process.env;
  const { key, fileName, treeId, application } = event.detail.userMetadata;

  if (application !== (APPLICATION || 'WatchTrees')) {
    console.log('Application is not matched');
    return;
  }

  const client = await clientPromise;

  /**
   * Find video nodes
   */

  const videoNodes = await findVideoNodes(client, treeId);

  const matchingIds = videoNodes
    .filter((node) => node.info && node.info.name === fileName)
    .map((node) => node._id);

  /**
   * Update video nodes
   */

  await updateVideoNodes(client, matchingIds, {
    'info.url': `${key}.${EXT || 'mpd'}`,
    'info.isConverted': true,
  });
};
