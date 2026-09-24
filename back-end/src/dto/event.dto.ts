import { IsNotEmpty, IsString, IsEnum, IsOptional, IsBoolean, IsDate, IsMilitaryTime, IsNumber } from 'class-validator';
import { EventState } from '../model/event';

export class EventCreateDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsMilitaryTime()
    startTime: string

    @IsNotEmpty()
    @IsMilitaryTime()
    endTime: string

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsOptional()
    @IsNumber()
    latitude?: number

    @IsOptional()
    @IsNumber()
    longitude?: number

    @IsNotEmpty()
    @IsEnum(EventState)
    state: string

    @IsOptional()
    @IsString()
    image?: string

    @IsNotEmpty()
    @IsString()
    adminId: string
}
