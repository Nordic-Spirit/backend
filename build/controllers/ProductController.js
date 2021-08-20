"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ProductController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repos_1 = require("../repos");
const CustomError_1 = require("../errors/CustomError");
let ProductController = ProductController_1 = class ProductController {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductController_1.repo.find();
            if (result instanceof CustomError_1.CustomError) {
                const { name, message, responseCode } = result;
                return res.status(responseCode).send({ name, message });
            }
            res.status(200).send(result);
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield res.send(req.params);
        });
    }
    getLatest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ProductController_1.repo.findLatest();
            if (result instanceof CustomError_1.CustomError) {
                const { name, message, responseCode } = result;
                return res.status(responseCode).send({ name, message });
            }
            res.status(200).send(result);
        });
    }
};
ProductController.repo = new repos_1.ProductRepo();
__decorate([
    decorators_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    decorators_1.get('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    decorators_1.get('/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getLatest", null);
ProductController = ProductController_1 = __decorate([
    decorators_1.controller('/products')
], ProductController);
