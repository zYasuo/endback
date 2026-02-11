import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class ProfileDTO {
    @IsString()
    @IsNotEmpty()
    uuid: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    created_at: string;

    @IsString()
    @IsNotEmpty()
    updated_at: string;
}