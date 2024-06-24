import Role from "../bd/models/roleModel.js";
import HttpError from "../helpers/HttpError.js";

const roleCreate = async (req, res, next) => {
    try {
        const { name } = req.body;
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            throw HttpError(400, "Role with this name already exists");
        }
       await Role.create({name});
        res.status(201).json({message: "Role created"});
    } catch (er) {
        next(er);
    }

}
export default roleCreate;