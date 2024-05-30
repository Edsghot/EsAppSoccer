import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaDto } from 'src/DTO/Area/Area.dto';
import { UpdateUserDto } from 'src/DTO/User/updateUserDto.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
    constructor(@InjectRepository(AreaEntity) private readonly areaRepository: Repository<AreaEntity>,
                @InjectRepository(ManagementEntity) private readonly managementRepository: Repository<ManagementEntity>) { }


    async CreateArea(request: AreaDto) {
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

    async updateArea(updateAreaDto:AreaDto,areaId:number){
        try{
            const area=await this.areaRepository.findOne({
                where:{IdArea:updateAreaDto.IdArea}
            })
        }catch{

        }
    }
}
