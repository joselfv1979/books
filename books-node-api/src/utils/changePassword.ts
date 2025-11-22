import bcrypt from "bcrypt";
import User from "../models/User";

export const changePassword = async (userIds?: string[]): Promise<void> => {
    const passwordHash = await bcrypt.hash("primavera", 10);

    const filter = userIds && userIds.length > 0 ? { _id: { $in: userIds } } : {};
    const res = await User.updateMany(filter, { $set: { password: passwordHash } });
    console.log(`Usuarios modificados: ${res.modifiedCount}`);
};