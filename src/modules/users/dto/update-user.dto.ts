import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {
    @IsMongoId({message: "Invalid ID !!!"})
    @IsNotEmpty({message: "ID must not be empty !!!"})
    _id: string;

    @IsOptional()
    name: string;
    
    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;
}
