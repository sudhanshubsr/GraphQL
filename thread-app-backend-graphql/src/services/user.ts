import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/db.js';

export interface CreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface GetUserPayload {
  email: string;
  password: string;
}

export const createUser = async (payload: CreateUserPayload) => {
  const { firstName, lastName, email, password } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  return response;
};

const getUserByEmail = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const decodeJWTToken = (token: any) => {
  if (!token) {
    throw new Error('Token must be provided');
  }
  try {
    const decodedToken = jwt.verify(token, 'secret');
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Invalid token');
  }
};

export const getUserInfo = async (payload: GetUserPayload) => {
  const { email, password } = payload;
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid Credentials');
  }
  const matchPassword = bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error('Invalid Credentials');
  }
  //Generate Token
  const token = jwt.sign({ id: user.id, email: user.email }, 'secret', {
    algorithm: 'HS256',
  });
  return token;
};
