const { ObjectId } = require('mongodb');

exports.findVideoNodes = async (client, treeId) => {
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

    const videoNodes = [result[0].root, ...result[0].root.children];

    return videoNodes;
  } catch (err) {
    console.log(err);
  }
};

exports.updateVideoNodes = async (client, ids, updates) => {
  try {
    const updateResult = await client
      .db()
      .collection('videonodes')
      .updateMany({ _id: { $in: ids } }, { $set: updates });

    console.log(updateResult);

    if (!updateResult.modifiedCount) {
      throw new Error('Nothing has updated.');
    }

    console.log('Updated url successfully!!');
  } catch (err) {
    console.log(err);
  }
};
