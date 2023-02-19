import Joi from 'joi';
export default class LikeModel{
    public userId: number;
    public vacationId: number;

    constructor(like: LikeModel){
        this.userId = like.userId;
        this.vacationId = like.vacationId;
    }

    private static validationSchema = Joi.object( {
        userId: Joi.number().required(),
        vacationId: Joi.number().required
    })

    public validation(): string {
        const res = LikeModel.validationSchema.validate(this);
        return res.error?.message;
    }
}