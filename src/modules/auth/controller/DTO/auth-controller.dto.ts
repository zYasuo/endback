import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignupDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class SigninDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

