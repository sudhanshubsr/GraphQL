import { prisma } from "../lib/db.js"
import bcrypt from 'bcryptjs'

export interface CreateUserPayload{
    firstName: string
    lastName?:string
    email: string
    password: string
}

export const createUser = async (payload:CreateUserPayload)=>{
    const {firstName, lastName, email, password} = payload
    const hashedPassword = await bcrypt.hash(password,10)
    const response =  prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })
    return response
}
