import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createSubjectDto: CreateSubjectDto, @UploadedFile() file?: Express.Multer.File) {
    return this.subjectService.create(createSubjectDto, file);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.subjectService.updateImage(+id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
