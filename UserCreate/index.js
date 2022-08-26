const { gateway } = require('./config/braintree');

exports.handler = async (event) => {
  const user = event.detail.fullDocument;

  const result = await gateway.customer.create({
    id: user._id,
    email: user.email,
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  console.log('Braintree customer created!');
};
