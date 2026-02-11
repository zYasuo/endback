import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtGuard } from "./guards/jwt-guard";
import { JWT_TOKENS } from "./constants/jwt-tokens";
@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET ?? "ENDBACK_SECRET",
            signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 18_000 }
        })
    ],
    providers: [JwtGuard,
        {
            provide: JWT_TOKENS.JWT_SERVICE,
            useClass: JwtService
        }
    ],
    exports: [JwtModule]
})
export class JwtAuthModule {}
