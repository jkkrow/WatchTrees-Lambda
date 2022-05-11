require('dotenv').config();
const { ObjectId } = require('mongodb');

const { clientPromise } = require('./config/db');

exports.handler = async (event) => {
  console.log(event);

  const { EXT, APPLICATION } = process.env;
  const { key, fileName, treeId, application } = event.detail.userMetadata;

  if (APPLICATION !== (application || 'WatchTrees')) return;

  const client = await clientPromise;

  try {
    const result = await client
      .db()
      .collection('videotrees')
      .aggregate([
        { $match: { _id: new ObjectId(treeId) } },
        {
          $lookup: {
            from: 'videonodes',
            let: { root: '$root', creator: '$info.creator' },
            as: 'root',
            pipeline: [
              { $match: { $expr: { $eq: ['$$root', '$_id'] } } },
              {
                $graphLookup: {
                  from: 'videonodes',
                  startWith: '$_id',
                  connectFromField: '_id',
                  connectToField: 'parentId',
                  as: 'children',
                  restrictSearchWithMatch: {
                    $expr: { $eq: ['$creator', '$$creator'] },
                  },
                },
              },
            ],
          },
        },
        { $unwind: '$root' },
      ])
      .toArray();

    if (!result.length) {
      throw new Error('No video found.');
    }

    const savedNodes = [result[0].root, ...result[0].root.children];
    const matchingIds = savedNodes
      .filter((node) => node.info && node.info.name === fileName)
      .map((node) => node._id);

    const updateResult = await client
      .db()
      .collection('videonodes')
      .updateMany(
        { _id: { $in: matchingIds } },
        {
          $set: {
            'info.url': `${key}.${EXT || 'mpd'}`,
            'info.isConverted': true,
          },
        }
      );

    console.log(updateResult);

    if (!updateResult.modifiedCount) {
      throw new Error('Nothing has updated.');
    }

    console.log('Updated url successfully!!');
  } catch (err) {
    console.log(err);
  }
};
