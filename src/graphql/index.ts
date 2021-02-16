import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export const datetimeScalar = asNexusMethod(DateTimeResolver, 'datetime');
export * as User from './User';
export * as Post from './Post';
