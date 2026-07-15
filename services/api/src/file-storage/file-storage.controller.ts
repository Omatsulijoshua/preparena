import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FileStorageService } from './file-storage.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('File Storage')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('file-storage')
export class FileStorageController {
  constructor(private service: FileStorageService) {}

  @Post()
  @ApiOperation({ summary: 'Upload file metadata' })
  create(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.service.create({ ...dto, uploadedBy: userId });
  }

  @Get()
  @ApiOperation({ summary: 'List files' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-files')
  @ApiOperation({ summary: 'Get current user files' })
  findByUploader(@CurrentUser('id') userId: string) {
    return this.service.findByUploader(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
