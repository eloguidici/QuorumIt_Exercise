import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Role',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
