import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffRoleService } from './staff-role.service';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { UpdateStaffRoleDto } from './dto/update-staff-role.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';

@Controller('staff-role')
export class StaffRoleController {
  constructor(private readonly staffRoleService: StaffRoleService) {}

  @Roles('DEKAN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStaffRoleDto: CreateStaffRoleDto) {
    return this.staffRoleService.create(createStaffRoleDto);
  }

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.staffRoleService.findAll();
  }

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffRoleService.findOne(+id);
  }

  @Roles('DEKAN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffRoleService.remove(+id);
  }
}
