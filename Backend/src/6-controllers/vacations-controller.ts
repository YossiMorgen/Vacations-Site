import express, { NextFunction, Request, Response } from "express";
import vacationsLogic from "../5-logic/vacations-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from '../3-middleware/verify-admin';
import VacationModel from "../4-models/vacation-model";
import cyber from "../2-utils/cyber";

const router = express.Router();

router.get('/vacations', verifyLoggedIn,  async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const user = await cyber.getDecodeToken(req)    
        const vacations = await vacationsLogic.getAllVacations(user.userId, (+req.query.start | 0), (+req.query.limit | 10));
        console.log(vacations);
        
        res.json(vacations);
    } catch (error) {
        next(error);
    }
});

router.post('/vacations', verifyAdmin, async (req: Request, res: Response, next: NextFunction)=>{
    try {
        req.body.image = req.files?.image;
        
        const vacation = new VacationModel(req.body);
        
        const newVacation = await vacationsLogic.addVacation(vacation);
        res.status(201).json(newVacation);

    } catch (error) {
        next(error);
    }
});

router.delete('/vacations/:id([0-9]+)', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await vacationsLogic.deleteVacation(+req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
})

router.put('/vacations/:id([0-9]+)', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const id = +req.params.id;
        
        req.body.image = req.files?.image;
        const vacation = new VacationModel(req.body);
        vacation.vacationId = id;
        const newVacation = await vacationsLogic.UpdateVacation(vacation);
        res.status(201).json(newVacation);

    } catch (error) {
        next(error);
    }

})
export default router;