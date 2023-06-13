import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentTestAnswerService } from './student-test-answer.service';
import { CreateStudentTestAnswerDto } from './dto/create-student-test-answer.dto';
import { UpdateStudentTestAnswerDto } from './dto/update-student-test-answer.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('student-test-answer')
export class StudentTestAnswerController {
  constructor(private readonly studentTestAnswerService: StudentTestAnswerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStudentTestAnswerDto: CreateStudentTestAnswerDto) {
    return this.studentTestAnswerService.create(createStudentTestAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  findAllCorrects(@Body() updateResultDto: UpdateResultDto) {
    return this.studentTestAnswerService.findAllCorrects(updateResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentTestAnswerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTestAnswerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentTestAnswerDto: UpdateStudentTestAnswerDto) {
    return this.studentTestAnswerService.update(+id, updateStudentTestAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTestAnswerService.remove(+id);
  }
}
