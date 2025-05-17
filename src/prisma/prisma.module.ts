import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// adding this, ensures that this module can be access globally, without manually importing every place.
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService] //then other modules can access this service as dependency injectioning and other stuffs
})
export class PrismaModule {}
