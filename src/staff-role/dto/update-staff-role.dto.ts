import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffRoleDto } from './create-staff-role.dto';

export class UpdateStaffRoleDto extends PartialType(CreateStaffRoleDto) {}
