import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaDto } from 'src/DTO/Area/CreateArea.dto';
import { UpdateAreaDto } from 'src/DTO/Area/UpdateArea.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
    constructor(@InjectRepository(AreaEntity) private readonly areaRepository: Repository<AreaEntity>,
                @InjectRepository(ManagementEntity) private readonly managementRepository: Repository<ManagementEntity>) { }


    async CreateArea(request: CreateAreaDto) {
        try {
            var newArea = new AreaEntity();
            const management = await this.managementRepository.findOne({
                where:{IdManagement:request.IdManagement}
            })
            if(!management){
                return{msg:'No se encontro la gerencia',success:false}
            }
            newArea.NameArea = request.NameArea;
            newArea.Management= management;
            newArea.Date = new Date();

            var Create = await this.areaRepository.create(newArea);
            await this.areaRepository.save(Create);
            return { msg: 'se inserto correctamente', success: true }
        } catch (e) {
            console.log("erro: ", e)
            return { msg: 'Error no se pudo insertar', success: false, detailMsg: e }
        }
    }

    async getAllAreas() {
        try {
            const areas = await this.areaRepository.find();
            return { data: areas, msg: 'Success', success: true };
        } catch (e) {
            console.error('Failed to get areas:', e);
            return { msg: 'Failed to get areas:', success: false, detailMsg: e }
        }
    }

    async getAreaById(areaId:number){
        try{
            const area=await this.areaRepository.findOne({
                where:{IdArea:areaId},
            });
            return {data:area,msg:'Success', success:true}
        }catch(e){
            console.error('Failed to get area by ID:', e);
            return { msg: 'Failed to get area', detailMsg: e, success: false };
        }
    }

    async deleteArea(areaId:number){
        try{
            await this.areaRepository.delete(areaId)
            return { msg: 'Area deleted successfully', success: true };
        }catch(e){
            console.error('Failed to delete area:', e);
            return { msg: 'Failed to delete area', detailMsg: e, success: false };
        }
    }

    async updateArea(updateAreaDto:UpdateAreaDto,areaId:number){
        try{
            const area=await this.areaRepository.findOne({
                where:{IdArea:areaId}
            })
            if(!area){
                return { msg: 'No se encontro el area', success: false };
            }
            if(updateAreaDto.IdManagement){
                const management = await this.managementRepository.findOne({
                    where:{IdManagement:updateAreaDto.IdManagement}
                })
                if(!management){
                    return{msg:'No se encontro la gerencia',success:false}
                }
                
                area.Management=management;
            }
            
            area.NameArea=updateAreaDto.NameArea;

            await this.areaRepository.save(area)
            return { msg: 'Area updated successfully', success: true };
        }catch(e){
            console.error('Failed to update area:', e);
            return { msg: 'Failed to update area', detailMsg: e, success: false };
        }
    }
}
