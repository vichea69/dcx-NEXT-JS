import { getProviders } from "next-auth/react";

export const authConfig ={
    session :{
        strategy: 'jwt',
    },
    providers :[]
}