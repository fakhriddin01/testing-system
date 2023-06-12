import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createSubjectDto: CreateSubjectDto, @UploadedFile() file?: Express.Multer.File) {
    return this.subjectService.create(createSubjectDto, file);
  }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.subjectService.updateImage(+id, file);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
