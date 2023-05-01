import axios from 'axios';
import LikeModel from "../Models/LikeModel";
import appConfig from "../Utils/AppConfig";

export default async function likesService(like: LikeModel) {

    if (!like.liked){
        await axios.post(appConfig.likes, {userId: like.userId, vacationId: like.vacationId});
        return
    }
    await axios.delete(appConfig.likes + "/" + like.userId + "/" + like.vacationId);

}