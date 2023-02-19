import jwt from 'jsonwebtoken';
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import User from "../4-models/user-model";
import cyber from "../2-utils/cyber";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model"
async function register(user : User) {

    const error = user.validation();
    if(error)  throw new ValidationErrorModel(error);

    if(await isUserNameExist(user.userName)) throw new ValidationErrorModel(`userName ${user.userName} already exists`);
    
    user.role = RoleModel.user;
    
    user.password = cyber.hash(user.password);
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?)`
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.userName, user.password, user.role]);

    user.userId = info.insertId;
    delete user.password;
    
    const token = cyber.getJwtToken(user)
    return token;
}

async function isUserNameExist(userName: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) as userName FROM users WHERE userName = ?`;
    const count = await dal.execute(sql,[userName]);
    console.log(count[0].userName);
    
    return count[0].userName > 0;
}

async function login(credentials: CredentialsModel):Promise<string> {

    const error = credentials.validate();
    if(error) throw new ValidationErrorModel(error);
    
    credentials.password = cyber.hash(credentials.password);
    console.log(credentials);
    const sql = `SELECT * FROM users WHERE userName = ? AND password = ?`
    const users = await dal.execute(sql, [credentials.userName, credentials.password ]);
    if(users.length === 0) throw new ValidationErrorModel(`incorrect userName or password`);
    
    const user = users[0];
    delete user.password;
   
    const token = cyber.getJwtToken(user);
    
    return token;

}

export default {
    register,
    login,
}