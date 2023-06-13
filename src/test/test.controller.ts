import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
