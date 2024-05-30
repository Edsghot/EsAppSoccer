import { Controller } from '@nestjs/common';
import { ManagementService } from './management.service';

@Controller('management')
export class ManagementController {
    constructor(private readonly managemenService:ManagementService){}
}
