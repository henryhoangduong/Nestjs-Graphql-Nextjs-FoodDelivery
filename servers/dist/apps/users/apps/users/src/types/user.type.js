"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = exports.RegisterResponse = exports.ErrorType = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../entities/user.entity");
let ErrorType = class ErrorType {};
exports.ErrorType = ErrorType;
__decorate(
  [(0, graphql_1.Field)(), __metadata("design:type", String)],
  ErrorType.prototype,
  "message",
  void 0,
);
__decorate(
  [(0, graphql_1.Field)({ nullable: true }), __metadata("design:type", String)],
  ErrorType.prototype,
  "code",
  void 0,
);
exports.ErrorType = ErrorType = __decorate(
  [(0, graphql_1.ObjectType)()],
  ErrorType,
);
let RegisterResponse = class RegisterResponse {};
exports.RegisterResponse = RegisterResponse;
__decorate(
  [
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", Object),
  ],
  RegisterResponse.prototype,
  "user",
  void 0,
);
__decorate(
  [
    (0, graphql_1.Field)(() => ErrorType, { nullable: true }),
    __metadata("design:type", ErrorType),
  ],
  RegisterResponse.prototype,
  "error",
  void 0,
);
exports.RegisterResponse = RegisterResponse = __decorate(
  [(0, graphql_1.ObjectType)()],
  RegisterResponse,
);
let LoginResponse = class LoginResponse {};
exports.LoginResponse = LoginResponse;
__decorate(
  [
    (0, graphql_1.Field)(() => user_entity_1.User, { nullable: true }),
    __metadata("design:type", user_entity_1.User),
  ],
  LoginResponse.prototype,
  "user",
  void 0,
);
__decorate(
  [
    (0, graphql_1.Field)(() => ErrorType, { nullable: true }),
    __metadata("design:type", ErrorType),
  ],
  LoginResponse.prototype,
  "error",
  void 0,
);
exports.LoginResponse = LoginResponse = __decorate(
  [(0, graphql_1.ObjectType)()],
  LoginResponse,
);
//# sourceMappingURL=user.type.js.map
