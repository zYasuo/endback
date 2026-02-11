import { User } from "@prisma/client";
import { SignupDTO } from "src/modules/auth/controller/DTO/auth-controller.dto";
import { UpdateUserDTO } from "src/commons/DTO/users.dto";
import { ProfileDTO } from "src/modules/user/controller/DTO/user-controller.dto";

export interface IUserService {
    createUser(user: SignupDTO): Promise<User>;
    deleteUser(uuid: string): Promise<void>;
    updateUser(uuid: string, data: UpdateUserDTO): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByUuid(uuid: string): Promise<User>;
    isUserExists(email: string): Promise<boolean>;
    profile(uuid: string): Promise<ProfileDTO>;
}