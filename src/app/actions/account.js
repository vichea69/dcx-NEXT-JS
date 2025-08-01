"use server"

import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";
import {validatePassword} from "@/queries/user.js";
import bcrypt from "bcryptjs";

export async function updateUserInfo(email,updatedData){
    try {
        const filter = {email: email};
        await User.findOneAndUpdate(filter,updatedData);
        revalidatePath('/account');
    } catch (error) {
        throw new Error(error);
    }

}
// End method

export async function changePassword(email,oldPassword,newPassword){
    const isMatch = await validatePassword(email,oldPassword);
    if(!isMatch){
        throw new Error("Old password is incorrect");
    }
        const filter = {email: email};
        const hashedPassword = await bcrypt.hash(newPassword,5);
        const dataToUpdate = {
            password: hashedPassword
        };
        try {
            await User.findOneAndUpdate(filter,dataToUpdate);
            revalidatePath('/account');
        } catch (error) {
            throw new Error(error);
        }

}