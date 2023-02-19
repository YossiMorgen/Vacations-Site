import axios from 'axios';
import {Request, Response, NextFunction } from "express";

async function recaptcha(req: Request, res: Response, next: NextFunction){
    try {
        const response_key = req.body.recaptcha;    
    
        const secret_key = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
        
        console.log(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`);
        
        const re = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`, {headers: { "Content-Type": "application/x-www-form-urlencoded", 'json': true}});
        console.log(re.data.success);
        
        if (!re.data.success) {
            return res.status(401).send('Why Are You Bot?');
        }
    } catch (error) {
        next(error);
    }
}