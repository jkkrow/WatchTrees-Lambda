const { ObjectId } = require('mongodb');

exports.validatePremiumUser = async (client, userId) => {
  const user = await client
    .db()
    .collection('users')
    .findOne({ _id: new ObjectId(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  const isPremium =
    user.premium.expired && new Date(user.premium.expredAt) > new Date();

  if (isPremium || user.isAdmin) {
    return true;
  }

  return false;
};
