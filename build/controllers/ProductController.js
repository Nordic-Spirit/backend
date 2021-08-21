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
var ProductController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const repos_1 = require("../repos");
const CustomError_1 = require("../errors/CustomError");
const CampaignRepo_1 = require("../repos/CampaignRepo");
const errors_1 = require("../errors");
let ProductController = ProductController_1 = class ProductController {
    // TODO KESKEN
    getProducts(req, res) {
        ProductController_1.productRepo
            .find()
            .then(result => {
            res.status(200).send(result);
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    // TODO KESKEN
    getProduct(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send(new CustomError_1.CustomError('Cant handle characters in id', errors_1.ErrorNames.typeError));
            return;
        }
        Promise.all([
            ProductController_1.productRepo.findById(id),
            ProductController_1.campaignRepo.findByProductId(id)
        ])
            .then(result => {
            const [product, campaign] = result;
            res.status(200).send({
                product,
                campaign
            });
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    getLatest(req, res) {
        Promise.all([
            ProductController_1.productRepo.findLatest(),
            ProductController_1.campaignRepo.findDiscounts()
        ])
            .then(result => {
            const [_products, discounts] = result;
            const products = ProductController_1.addDiscountRow(_products, discounts);
            res.status(200).send({
                products,
                discounts
            });
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    getMostPopular(req, res) {
        Promise.all([
            ProductController_1.productRepo.findMostPopulars(),
            ProductController_1.campaignRepo.findDiscounts()
        ])
            .then(result => {
            const [_products, discounts] = result;
            const products = ProductController_1.addDiscountRow(_products, discounts);
            res.status(200).send({
                products,
                discounts
            });
        })
            .catch(error => {
            const { name, message, sqlErrorCode } = error;
            res
                .status(errors_1.ErrorResponseCodes._422)
                .send({ name, message, sqlErrorCode });
        });
    }
    static addDiscountRow(products, discounts) {
        return products.map((product) => {
            discounts.forEach((discount) => {
                if (product.productId === discount.productId) {
                    product['discountPercentage'] = discount.discountPercentage;
                    return;
                }
            });
            return product;
        });
    }
};
ProductController.productRepo = new repos_1.ProductRepo();
ProductController.campaignRepo = new CampaignRepo_1.CampaignRepo();
__decorate([
    decorators_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    decorators_1.get('/single/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProduct", null);
__decorate([
    decorators_1.get('/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getLatest", null);
__decorate([
    decorators_1.get('/mostpopulars'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getMostPopular", null);
ProductController = ProductController_1 = __decorate([
    decorators_1.controller('/products')
], ProductController);
