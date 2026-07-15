import { Controller, Get, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(@CurrentUser('id') id: string, @Body() dto: any) {
    return this.usersService.updateProfile(id, dto);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN', 'SUPPORT_ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get user by ID (admin)' })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN', 'SUPPORT_ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all users (admin)' })
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }
}
