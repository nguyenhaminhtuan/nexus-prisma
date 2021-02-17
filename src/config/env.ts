const env = {
  isProd: process.env.NODE_ENV === 'production',
  auth: {
    issuer: process.env.COGNITO_URL || '',
    audience: process.env.COGNITO_CLIENT_ID || '',
  },
};

export default env;
