import { IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
