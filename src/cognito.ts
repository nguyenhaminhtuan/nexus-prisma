import {
  PreSignUpTriggerHandler,
  PostConfirmationTriggerHandler,
  PostAuthenticationTriggerHandler,
  PreTokenGenerationTriggerHandler,
} from 'aws-lambda';

export const preSignUp: PreSignUpTriggerHandler = async (
  event,
  context,
  callback
) => {
  return callback(null, event);
};

export const postComfirmation: PostConfirmationTriggerHandler = async (
  event,
  context,
  callback
) => {
  return callback(null, event);
};

export const postAuthentication: PostAuthenticationTriggerHandler = async (
  event,
  context,
  callback
) => {
  return callback(null, event);
};

export const preTokenGeneration: PreTokenGenerationTriggerHandler = async (
  event,
  context,
  callback
) => {
  return callback(null, event);
};
