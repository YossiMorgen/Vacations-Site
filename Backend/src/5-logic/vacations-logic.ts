import { OkPacket } from 'mysql';
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from '../4-models/error-models';
import fileHandler from '../2-utils/file-handler';
import VacationModel from '../4-models/vacation-model';
import fileUpload, { UploadedFile } from 'express-fileupload';
import createUpdateVacationSql from '../2-utils/create-update-vacation-sql';
import appConfig from '../2-utils/AppConfig';
import getUpdateVacation from '../2-utils/get-update-vacation';

async function getAllVacations(id: number, start: number, end: number): Promise<VacationModel[]> {
    const vacations = await dal.execute(
        `SELECT vacation.vacationId, destination, description,  CONCAT(?, imageName) AS imageName, start, end, price, 
        COUNT(likes.vacationId) AS likes,
        EXISTS(SELECT 1 FROM likes WHERE vacation.vacationId = likes.vacationId AND likes.userId = ${id}) AS liked
        FROM vacation
        LEFT JOIN likes ON vacation.vacationId = likes.vacationId
        GROUP BY vacationId
        ORDER BY start 
        LIMIT ?
        OFFSET ?
    `, ['http://' + appConfig.host+ ":" + appConfig.port +"/", end, start]);
    console.log("vacations" + vacations);
    
    return vacations;
}

async function addVacation(vacation:VacationModel): Promise<VacationModel> {
    
    const err = vacation.validation();
    if(err) throw new ValidationErrorModel(err);

    vacation.imageName = await fileHandler.saveFile(vacation.image);
    delete vacation.image;
    
    const sql = "INSERT INTO vacation VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)";
    const info:OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.imageName, vacation.start, vacation.end, vacation.price]);
    
    vacation.vacationId = info.insertId;
    
    return vacation; 
}


async function UpdateVacation(vacation: VacationModel): Promise<VacationModel> {        
    
    const err = vacation.validation();
    if(err) throw new ValidationErrorModel(err); 

    let sql = "UPDATE vacation SET description =?, destination=?, start =?, end =?, price =?";
    const arr: Array<any> = [vacation.description, vacation.destination, vacation.start, vacation.end, vacation.price]

    const oldPic = await dal.execute("SELECT imageName FROM vacation WHERE vacationId =?", [vacation.vacationId]);       
    const oldPhoto = oldPic[0]["imageName"];
    
    if(vacation.image){
        fileHandler.deleteFile(oldPhoto);
        vacation.imageName = 'http://' + appConfig.host+ ":" + appConfig.port +"/" + await fileHandler.saveFile(vacation.image);
        delete vacation.image;
        sql += " , imageName =?";
        arr.push(vacation.imageName);
    }
    
    sql += ` WHERE vacationId =?`
    arr.push(vacation.vacationId);

    const info: OkPacket = await dal.execute(sql, [...arr]);     
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);

    return vacation;
}

async function deleteVacation(id:number): Promise<void> {

    const sql = "DELETE FROM vacation WHERE vacationId =?";
    const info:OkPacket = await dal.execute(sql, [id]);
    if(info.affectedRows = 0) throw new ResourceNotFoundErrorModel(id)   

}


export default {
    getAllVacations,
    addVacation,
    deleteVacation,
    UpdateVacation
};




// PATCH
// async function UpdateVacation(vacation: VacationModel): Promise<VacationModel> {
    
//     const oldVacation = await getOneVacation(vacation.vacationId);
        
    
//     // const err = vacation.updateValidation();
//     // if(err) throw new ValidationErrorModel(err); 

//     if(vacation.image){
//         fileHandler.deleteFile(oldVacation.imageName);
//         vacation.imageName = await fileHandler.saveFile(vacation.image);
//         delete vacation.image;
//     }

//     const newVacation = getUpdateVacation(oldVacation, vacation);

//     const {sql, arr} = createUpdateVacationSql(vacation);
    
//     const info: OkPacket = await dal.execute(sql, [...arr]);        

//     newVacation.imageName = 'http://' + appConfig.host+ ":" + appConfig.port +"/" + newVacation.imageName;

//     console.log(newVacation);
    
//     return newVacation;
// }




// async function getOneVacation(id:number): Promise<VacationModel> {
//     const res = await dal.execute("SELECT * FROM vacation WHERE vacationId =?", [id]);
//     if(res.length === 0) throw new ResourceNotFoundErrorModel(id);
//     return res[0];  
// }