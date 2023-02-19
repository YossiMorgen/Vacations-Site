import { UploadedFile } from 'express-fileupload';
import Joi from "joi";
import RoleModel from './role-model';



class User{
    public userId: number;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public role: RoleModel;

    constructor(user: User) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        userName: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(2).max(30),
        role: Joi.string().optional(),
    })

    public validation():string{
        const res = User.validationSchema.validate(this);
        return res.error?.message;
    }
}
export default User