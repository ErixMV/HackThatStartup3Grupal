import bcrypt from "bcrypt";

export const encrypt = async (notEncryptedPassword) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(notEncryptedPassword, salt);

    return hash;
};

export const compareHash = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
}