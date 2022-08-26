const braintree = require('braintree');

exports.gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment[process.env.BRAINTREE_ENVIRONMENT],
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
