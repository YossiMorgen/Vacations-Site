import { OkPacket } from 'mysql';
import dal from "../2-utils/dal";
import LikeModel from "../4-models/like-model";

// export async function ToggleLike(like: LikeModel) {
  
//   let sql = `SELECT COUNT(*) as isLiked FROM likes WHERE userId =? AND vacationId =?`;
//   const toggle: boolean = await dal.execute(sql, [like.userId, like.vacationId]);
  
//   if(!toggle[0]["isLiked"]){

//     sql = `INSERT INTO likes VALUES (?, ?)`;
//     await dal.execute(sql, [like.vacationId, like.userId]);
//     return true;

//   }
  
//   sql = `DELETE FROM likes WHERE userId =? AND vacationId =?`;
//   await dal.execute(sql, [like.userId, like.vacationId]);
//   return false;

// }

// export default async function ToggleLike(like: LikeModel): boolean {
//     let sql = `INSERT INTO likes VALUES (?, ?)`;
//     try {
//       await dal.execute(sql, [like.userId, like.vacationId]);
//     } catch (error: any) {
//       console.log(error.message);
//       // sql = `SELECT * FROM likes WHERE userId =? AND vacationId =?`;
//       // const info = await dal.execute(sql, [like.userId, like.vacationId]);
//       // console.log(info);
      
//       sql = 'DELETE FROM likes WHERE userId = ? AND vacationId = ?'
//       await dal.execute(sql, [like.userId, like.vacationId]); 
//       return false;
//     }    
     
//      return true;
// }

async function addLike(like: LikeModel){
      const sql = `INSERT INTO likes VALUES (?, ?)`;
      await dal.execute(sql, [like.vacationId, like.userId]);
}

async function removeLike(like: LikeModel){
      const sql = 'DELETE FROM likes WHERE userId = ? AND vacationId = ?'
      await dal.execute(sql, [like.userId, like.vacationId]); 
}

export default {
  addLike,
  removeLike
}


// IF (
//   SELECT COUNT(*) FROM likes 
//   WHERE userId = 17 AND vacationId = 16,
//   DELETE FROM likes WHERE userId = 17 AND vacationId = 16, 
//   INSERT INTO likes VALUES(16, 17)
// )

// CASE 
// 	WHEN (EXISTS(SELECT * FROM likes WHERE vacationId = 16 AND userId = 17)
//           THEN (DELETE from vacation WHERE vacationId = 16 AND userId = 17
//     ELSE INSERT INTO vacation VALUES(16, 17)
// END        