import { auth } from "../helpers/token.js";
import User from "../bd/models/userModel.js";

export async function tokenUpdate(data) {
    try {
        const { id } = data;
        const token = auth(id);
        const result = await User.findByIdAndUpdate(id, { $set: { token } }, { new: true });
        return result;
    }
    catch (error) {
        console.error(error.message)
    }
}