
export default class VacationModel{

    public vacationId: number;
    public destination: string;
    public description: string;
    public start: Date;
    public end: Date;
    public price: number;
    public image: FileList;
    public imageName: string;
    public likes: number;
    public liked: boolean;

    // public constructor(vacation: VacationModel){
    //     this.vacationId = vacation.vacationId;
    //     this.destination = vacation.destination;
    //     this.description = vacation.description;
    //     this.start = vacation.start;
    //     this.end = vacation.end;
    //     this.price = vacation.price;
    //     this.image = vacation.image;
    //     this.imageName = vacation.imageName;
    //     this.likes = vacation.likes;
    //     this.liked = vacation.liked;
    // }

}