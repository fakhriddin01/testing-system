import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivateStudentDto } from './dto/activate-student.dto';
import { DeactivateStudentDto } from './dto/deactivate-student.dto copy';
import { UpdatePasswordDto } from '../staff/dto/update-password.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Post('login')
  login(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentService.login(loginStudentDto);
  }

  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.studentService.updateImage(+id, file);
  }

  @Post('activation')
  activation(activateStudentDto: ActivateStudentDto) {
    return this.studentService.activation(activateStudentDto);
  }

  @Post('deactivation')
  deactivation(deactivateStudentDto: DeactivateStudentDto) {
    return this.studentService.deactivation(deactivateStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Patch('/password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.studentService.updatePassword(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
