import { createUser, CreateUserPayload } from "../../services/user.js"

const queries = {}
const mutations ={
    createUser: async(parent:any, payload:CreateUserPayload)=>{
        const res = await createUser(payload)
        return res.id;
    }
}


export const resolvers = {queries, mutations}
