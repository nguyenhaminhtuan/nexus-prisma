import dotenv from 'dotenv';
dotenv.config();

const env = {
  isProd: process.env.NODE_ENV === 'production',
  app: {
    port: process.env.PORT || 4000,
  },
  jwtSecret: process.env.JWT_SECRET || 'meowmeowmeow',
};

export default env;
