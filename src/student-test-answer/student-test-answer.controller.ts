import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentTestAnswerService } from './student-test-answer.service';
import { CreateStudentTestAnswerDto } from './dto/create-student-test-answer.dto';
import { UpdateStudentTestAnswerDto } from './dto/update-student-test-answer.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('student-test-answer')
export class StudentTestAnswerController {
  constructor(private readonly studentTestAnswerService: StudentTestAnswerService) {}

  @Post()
  create(@Body() createStudentTestAnswerDto: CreateStudentTestAnswerDto) {
    return this.studentTestAnswerService.create(createStudentTestAnswerDto);
  }
  @Post('/update')
  findAllCorrects(@Body() updateResultDto: UpdateResultDto) {
    return this.studentTestAnswerService.findAllCorrects(updateResultDto);
  }

  @Get()
  findAll() {
    return this.studentTestAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTestAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentTestAnswerDto: UpdateStudentTestAnswerDto) {
    return this.studentTestAnswerService.update(+id, updateStudentTestAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTestAnswerService.remove(+id);
  }
}
