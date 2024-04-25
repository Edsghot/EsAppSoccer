import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
@Injectable()
export class ValidateService {
  
    async validateDni(dni:string){
        if(dni.length ===8){
            return {success: true,msg: "Intruduzca un dni correcto"};
        }
        return {success: true,msg: "correcto"};
    }

    async validatePhoneNumber(phone:string){
        if(phone.length === 9){
            return {success: true,msg: "Intruduzca un numero correcto"};
        }
        return {success: true,msg: "correcto"};
    }

}
