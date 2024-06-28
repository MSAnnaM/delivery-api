import { auth } from "../helpers/token.js";
import Client from "../bd/models/clientModel.js"; 

export async function clientTokenUpdate(data) {
    try {
        const { id } = data;
        const token = auth(id);
        const result = await Client.findByIdAndUpdate(id, { $set: { token } }, { new: true });
        return result;
    }
    catch (error) {
        console.error(error.message)
    }
}