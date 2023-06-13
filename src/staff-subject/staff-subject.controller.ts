import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffSubjectService } from './staff-subject.service';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';

@Controller('staff-subject')
export class StaffSubjectController {
  constructor(private readonly staffSubjectService: StaffSubjectService) {}

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStaffSubjectDto: CreateStaffSubjectDto) {
    return this.staffSubjectService.create(createStaffSubjectDto);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.staffSubjectService.findAll();
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffSubjectService.findOne(+id);
  }

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffSubjectService.remove(+id);
  }
}
