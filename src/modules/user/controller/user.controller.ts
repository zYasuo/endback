import { Controller, Get, UseGuards, Req, Inject } from "@nestjs/common";
import type { IUserService } from "../services/interfaces/user-service.interface";
import { ProfileDTO } from "./DTO/user-controller.dto";
import { JwtGuard } from "src/modules/auth/jwt/guards/jwt-guard";
import { USER_MODULE_TOKENS } from "../constants/user.tokens.constants";

@Controller("users")
export class UserController {
    constructor(
        @Inject(USER_MODULE_TOKENS.USER_SERVICE) private readonly user_service: IUserService
    ) {}

    @Get("profile") 
    @UseGuards(JwtGuard)
    async profile(@Req() request: Request): Promise<ProfileDTO> {
        return this.user_service.profile(request["user"].sub);
    }
}