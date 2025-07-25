import { replaceMongoIdInObject } from "@/lib/convertData"; 
import { User } from "@/model/user-model";
import connectToDB from "../../service/mongo.js";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
    const db = await connectToDB();
    const user = await User.findOne({ email }).lean(); // lean = plain JS object
    return replaceMongoIdInObject(user); // ✅ correct utility for a single object
}

export async function validatePassword(email, password) {
    const user = await getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;

}