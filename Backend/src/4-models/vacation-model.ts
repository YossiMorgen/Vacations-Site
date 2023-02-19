import Joi from "joi";
import { UploadedFile } from "express-fileupload";

export default class VacationModel{

    public vacationId: number;
    public destination: string;
    public description: string;
    public start: Date;
    public end: Date;
    public price: number;
    public image: UploadedFile;
    public imageName: string;
    public likes: number;
    public liked: boolean;

    public constructor(vacation: VacationModel){
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start = vacation.start;
        this.end = vacation.end;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.likes = vacation.likes;
        this.liked = vacation.liked;
  
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(2).max(200).required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
        price: Joi.number().positive().required(),
        image: Joi.optional(),
        imageName: Joi.string().min(5).max(100).optional(),
        likes: Joi.number().positive().optional(),
        liked: Joi.boolean().optional()
    })

    public validation():string{
        const res = VacationModel.validationSchema.validate(this);
        return res.error?.message;
    }

}