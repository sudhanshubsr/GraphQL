import { AnyARecord } from 'dns';
import {
  createUser,
  CreateUserPayload,
  getUserById,
  getUserInfo,
  GetUserPayload,
} from '../../services/user.js';

const queries = {
  getUserInfo: async (parent: any, payload: GetUserPayload) => {
    const { email, password } = payload;
    const token = await getUserInfo({ email, password });
    return token;
  },
  getCurrentLoggedInUser: async (parent: any, parameter: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await getUserById(id);
      return user;
    }
  },
};
const mutations = {
  createUser: async (parent: any, payload: CreateUserPayload) => {
    const res = await createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
