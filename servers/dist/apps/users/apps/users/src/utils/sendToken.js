"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSender = void 0;
class TokenSender {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.sendToken = (user) => {
            const accessToken = this.jwtService.sign({
                id: user.id,
            }, {
                secret: this.configService.get("ACCESS_TOKEN_SECRET"),
            });
            const refreshToken = this.jwtService.sign({
                id: user.id,
            }, {
                secret: this.configService.get("REFRESH_TOKEN_SECRET"),
                expiresIn: "3d",
            });
            return { user, accessToken, refreshToken };
        };
    }
}
exports.TokenSender = TokenSender;
//# sourceMappingURL=sendToken.js.map