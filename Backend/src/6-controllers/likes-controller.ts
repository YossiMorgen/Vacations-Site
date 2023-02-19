import express, { NextFunction, Request, Response }  from 'express';
import LikeModel from '../4-models/like-model';
import verifyUser from '../3-middleware/verify-user';
import likesLogic from '../5-logic/likes-logic';
import verifyLoggedIn from '../3-middleware/verify-logged-in';

const router = express.Router();

// router.post('/likes', verifyUser,  async (req: Request, res: Response, next: NextFunction)=>{
//     try {
//         console.log(req.body);
        
//         const like = new LikeModel(req.body);
//         console.log(like);
        
//         await likesLogic.ToggleLike(like) ? res.sendStatus(201) : res.sendStatus(204);    
//     } catch (error) {
//         next(error);
//     }
// })

router.post('/likes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await likesLogic.addLike(new LikeModel(req.body));
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
})

router.delete('/likes/:userId([0-9]+)/:vacationId([0-9]+)', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const like = {userId: +req.params.userId, vacationId: +req.params.vacationId, validation: () => {return ''}}
        await likesLogic.removeLike(new LikeModel(like));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})
export default router;