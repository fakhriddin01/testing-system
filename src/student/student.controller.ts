import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivateStudentDto } from './dto/activate-student.dto';
import { DeactivateStudentDto } from './dto/deactivate-student.dto copy';
import { UpdatePasswordDto } from '../staff/dto/update-password.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post('login')
  login(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentService.login(loginStudentDto);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.studentService.updateImage(+id, file);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('activation')
  activation(activateStudentDto: ActivateStudentDto) {
    return this.studentService.activation(activateStudentDto);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('deactivation')
  deactivation(deactivateStudentDto: DeactivateStudentDto) {
    return this.studentService.deactivation(deactivateStudentDto);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }
  
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.studentService.updatePassword(+id, updatePasswordDto);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
