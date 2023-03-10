import express, {Request, Response, NextFunction } from "express";
import User from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/credentials-model";
import RoleModel from "../4-models/role-model";

const router = express.Router() 

router.post("/auth/register", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
        req.body.image = req.files?.image;

        const user = new User(req.body);
        
        user.role = RoleModel.user;
        console.log(user);
        
        const token = await authLogic.register(user);
        res.status(201).json(token);

    } catch (error) {
        next(error);
    }
})

router.post("/auth/login", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const credentials = new CredentialsModel(req.body);
        console.log(credentials)
        const token = await authLogic.login(credentials);
        res.json(token);
    } catch (error) {
        next(error);
    }
})

// router.patch("/auth/:id", verifyUser, async(req: Request, res: Response, next: NextFunction) =>{
//     try {
//         const id = +req.params.id;
//         const user = new User(req.body);
//         user.userId = id;
//         console.log(user);
        
//         const token = await authLogic.updateUser(user);                
//         res.status(201).json(token);
//     } catch (error) {
//         next(error);
//     }
// })

export default router;