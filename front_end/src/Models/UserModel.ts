import RoleModel from "./RoleModel";

class UserModel{
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public password: string;
    public userName: string;
    public role: RoleModel;
    public recaptcha: string;

    // constructor(user: UserModel) {
    //     this.userId = user.userId;
    //     this.firstName = user.firstName;
    //     this.lastName = user.lastName;
    //     this.userName = user.userName;
    //     this.password = user.password;
    //     this.role = user.role;
    // }

}

export default UserModel;