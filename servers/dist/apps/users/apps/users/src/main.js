"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const users_module_1 = require("./users.module");
const path_1 = require("path");
async function bootstrap() {
  const app = await core_1.NestFactory.create(users_module_1.UsersModule);
  app.useStaticAssets((0, path_1.join)(__dirname, "..", "public"));
  app.setBaseViewsDir(
    (0, path_1.join)(__dirname, "..", "servers/email-templates"),
  );
  app.setViewEngine("ejs");
  await app.listen(process.env.port ?? 4001);
}
bootstrap();
//# sourceMappingURL=main.js.map
