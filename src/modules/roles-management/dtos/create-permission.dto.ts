import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'Permiso',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
