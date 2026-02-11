import { Exclude, Expose } from "class-transformer";

export class UserResponseDTO {
    @Exclude()
    id: number;

    @Expose()
    uuid: string;
    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose({ name: "created_at" })
    createdAt: Date;
    @Expose({ name: "updated_at" })
    updatedAt: Date;
}

export class UpdateUserDTO {
    email?: string;
    password?: string;
    role?: "ADMIN" | "USER";
}


export class SigninResponseDTO {
    user: UserResponseDTO;
    access_token?: string;  
    token_type?: "Bearer";
}