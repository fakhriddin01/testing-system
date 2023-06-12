import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { StaffRole } from '../staff-role/models/staff-role.model';
import { StaffSubject } from '../staff-subject/models/staff-subject.model';
import { Group } from '../group/models/group.model';

@Module({
  imports:[SequelizeModule.forFeature([Staff, StaffRole, StaffSubject, Group]),
  JwtModule.register({
    
  }),
  FilesModule,
],
  controllers: [StaffController],
  providers: [StaffService],
  exports:[StaffService]
})
export class StaffModule {}
