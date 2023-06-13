import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffGroupService } from './staff-group.service';
import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { UpdateStaffGroupDto } from './dto/update-staff-group.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('staff-group')
export class StaffGroupController {
  constructor(private readonly staffGroupService: StaffGroupService) {}

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStaffGroupDto: CreateStaffGroupDto) {
    return this.staffGroupService.create(createStaffGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.staffGroupService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffGroupService.findOne(+id);
  }

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffGroupService.remove(+id);
  }
}
