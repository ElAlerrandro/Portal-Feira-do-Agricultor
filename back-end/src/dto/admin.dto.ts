import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

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

    @IsNotEmpty()
    @IsString()//Trocar para ENUM posteriormente
    role: string;
}

export class AdminLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}