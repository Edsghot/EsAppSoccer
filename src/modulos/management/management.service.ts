import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagementEntity } from 'src/ENTITY/Management.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagementService {
    constructor(@InjectRepository(ManagementEntity) private readonly managementRepository:Repository<ManagementEntity>){}
}
