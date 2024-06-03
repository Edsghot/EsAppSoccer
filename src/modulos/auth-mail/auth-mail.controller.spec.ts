import { Test, TestingModule } from '@nestjs/testing';
import { AuthMailController } from './auth-mail.controller';

describe('AuthMailController', () => {
  let controller: AuthMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthMailController],
    }).compile();

    controller = module.get<AuthMailController>(AuthMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
