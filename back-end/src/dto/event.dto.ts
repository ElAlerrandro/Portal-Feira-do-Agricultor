import { IsNotEmpty, IsString, IsEnum, IsOptional, IsBoolean, IsDate, IsMilitaryTime, IsNumber } from 'class-validator';
import { EventState } from '../model/event';

export class EventCreateDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsMilitaryTime()
    startAt: string;

    @IsNotEmpty()
    @IsMilitaryTime()
    endAt: string;

    @IsNotEmpty()
    @IsString()
    localAddress: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @IsString()
    bannerImage?: string;
}

//Tirei o id do administradot pois qualquer um poderia criar um evento em nome de outro admin safadinho
//ou seja vai ser definido pelo token de quem está autenticando.... e vai se criando um clima gostoso

export class EventUpdateDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    date?: Date;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    startAt: string;

    @IsOptional()
    @IsMilitaryTime()
    endAt: string;

    @IsOptional()
    @IsString()
    localAddress: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsOptional()   
    @IsEnum(EventState)
    state?: EventState

    @IsOptional()
    @IsString()
    bannerImage?: string;
}

