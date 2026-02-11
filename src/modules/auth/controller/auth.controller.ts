import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { type IAuthService } from "../services/interfaces/auth-services.interface";
import { AUTH_MODULE_TOKENS } from "../constants/auth.tokens.constants";
import { SigninDTO, SignupDTO } from "./DTO/auth-controller.dto";
import { SigninResponseDTO, UserResponseDTO } from "../../../commons/DTO/users.dto";

@Controller("auth")
export class AuthController {
    constructor(@Inject(AUTH_MODULE_TOKENS.AUTH_SERVICE) private readonly auth_service: IAuthService) {}

    @Post("signin")
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: SigninDTO): Promise<SigninResponseDTO> {
        const { user, access_token } = await this.auth_service.signin(body.email, body.password);
        return {
            user: plainToInstance(UserResponseDTO, user),
            access_token,
            token_type: "Bearer"
        };
    }

    @Post("signup")
    async signup(@Body() body: SignupDTO): Promise<SigninResponseDTO> {
        const user = await this.auth_service.signup(body.email, body.password);
        return { user: plainToInstance(UserResponseDTO, user) };
    }
}