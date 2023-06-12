import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { LoginStaffDto } from './dto/login-staff.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivateStaffDto } from './dto/activate-staff.dto';
import { DeactivateStaffDto } from './dto/deactivate-staff.dto copy';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('create')
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Post('login')
  login(@Body() loginStaffDto: LoginStaffDto) {
    return this.staffService.login(loginStaffDto);
  }


  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.staffService.updateImage(+id, file);
  }

  @Post('activation')
  activation(activateStaffDto: ActivateStaffDto) {
    return this.staffService.activation(activateStaffDto);
  }

  @Post('deactivation')
  deactivation(deactivateStaffDto: DeactivateStaffDto) {
    return this.staffService.deactivation(deactivateStaffDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Patch('/password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.staffService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
