const { ObjectId } = require('mongodb');

exports.validatePremiumUser = async (client, userId) => {
  const user = await client
    .db()
    .collection('users')
    .findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isPremium || user.isAdmin) {
    return true;
  }

  return false;
};
