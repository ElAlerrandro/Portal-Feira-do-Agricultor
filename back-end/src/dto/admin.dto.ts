import { IsNotEmpty, IsString, IsEmail, IsEnum, isString, IsBoolean, IsOptional } from 'class-validator';
import { administratorRole } from '../enums/administrator-role.enum';

export class AdminCreateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}

export class UpdateOwnProfileDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    password: string;
}

export class UpdateAdminByMasterDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsEnum(administratorRole)
    role: administratorRole;

    @IsOptional()
    @IsBoolean()
    active: boolean;
}