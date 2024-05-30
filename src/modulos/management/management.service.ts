import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagementDto } from 'src/DTO/Management/Management.dto';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagementService {
    constructor(@InjectRepository(ManagementEntity) private readonly managementRepository:Repository<ManagementEntity>){}

    async createManagement(managementDto:ManagementDto){
        try{
            const management=await this.managementRepository.findOne({
                where:{NameManagement:managementDto.NameManagement.toUpperCase()}
            })
            if(management){
                return {msg:"La gerencia ya existe, verifique el nombre",success:false}
            }
            var newManagement=new ManagementEntity();

            newManagement.NameManagement=managementDto.NameManagement.toUpperCase();

            var Create=await this.managementRepository.create(newManagement);
            await this.managementRepository.save(Create)
            return{msg:"Se inserto correctamente la gerencia "+managementDto.NameManagement,success:true}
        }catch(e){
            console.error("Error: ", e)
            return { msg: 'Error no se pudo insertar', success: false, detailMsg: e }
        }
    }

    async getAllManagements(){
        try{
            const managemets=await this.managementRepository.find();
            return {data:managemets,msg:'Success', success:true}
        }catch(e){
            console.error('Failed to get managements:', e);
            return { msg: 'Failed to get managements:', success: false, detailMsg: e }
        }
    }

    async getManagementById(managementId:number){
        try{
        const management=await this.managementRepository.findOne({
            where:{IdManagement:managementId},
        });
        if(!management){
            return{data:null,msg:"no se encontro la gerencia",success:false}
        }
        return {data:management,msg:'Success', success:true}
        }catch(e){
            console.error('Failed to get management by ID:', e);
            return { msg: 'Failed to get management', detailMsg: e, success: false };
        }
    }
    
    async deleteManagement(managementId:number){
        try{
            const management=await this.managementRepository.findOne({
                where:{IdManagement:managementId},
            });
            if(!management){
                return {msg:"La gerencia no existe",success:false}
            }
            await this.managementRepository.delete(managementId)
            return { msg: 'Se elimino correctament la gerencia '+management.NameManagement, success: true };
        }catch(e){
            console.error('Failed to delete management:', e);
            return { msg: 'Failed to delete management', detailMsg: e, success: false };
        }
    }

    async updateManagement(managementId:number,managementDto:ManagementDto){
        try{
            const management=await this.managementRepository.findOne({
                where:{IdManagement:managementId}
            })
            if(!management){
                return{msg: 'No se encontro la gerencia', success: false };
            }
            management.NameManagement=managementDto.NameManagement;
            await this.managementRepository.save(management);
            return { msg: 'Se actualizo correctamente la gerencia', success: true };
        }catch(e){
            console.error('Failed to update management:', e);
            return { msg: 'Failed to update management', detailMsg: e, success: false };
        }
    }
}
