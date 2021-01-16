import bcrypt from "bcryptjs";

export const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt);
}
