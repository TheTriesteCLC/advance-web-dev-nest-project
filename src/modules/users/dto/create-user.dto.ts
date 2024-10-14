import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;

    @IsOptional()
    @Transform(({value}) => {
        return Number(value);
    })
    @IsNumber()
    age: Number;
}