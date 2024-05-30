import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaDto } from 'src/DTO/Area/CreateArea.dto';
import { AreaEntity } from 'src/ENTITY/Area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreaService {
    constructor(@InjectRepository(AreaEntity) private readonly areaRepository: Repository<AreaEntity>) { }


    async CreateArea(request: CreateAreaDto) {
        try {
            var newArea = new AreaEntity();

            newArea.NameArea = request.NameArea;
            newArea.Date = new Date();

            var Create = await this.areaRepository.create(newArea);
            await this.areaRepository.save(Create);
            return { msg: 'se inserto correctamente', success: true}
        } catch (e) {
            console.log("erro: ",e)
            return{ msg: 'Error no se pudo insertar', success: false, DetailMsg: e}
        }
    }
}
