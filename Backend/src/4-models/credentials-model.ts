import Joi from "joi";

class CredentialsModel {

    public userName: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.userName = credentials.userName;
        this.password = credentials.password;
    }

    public static validationSchema = Joi.object({
        userName: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(4).max(30)
    });

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;
