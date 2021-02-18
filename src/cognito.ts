import { PreSignUpTriggerHandler } from 'aws-lambda';

export const preSignUp: PreSignUpTriggerHandler = async (
  event,
  context,
  callback
) => {
  return callback(null, event);
};
