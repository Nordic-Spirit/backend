import { Request, Response } from 'express';
import { controller, get } from './decorators';
import { ProductRepo } from '../repos';
import { CustomError } from '../errors/CustomError';
import { CampaignRepo } from '../repos/CampaignRepo';
import { ProductProps, ProductDiscount } from '../repos/interfaces';
import { ErrorNames, ErrorResponseCodes } from '../errors';
import { errorMonitor } from 'events';

@controller('/products')
class ProductController {
  static productRepo = new ProductRepo();
  static campaignRepo = new CampaignRepo();

  // TODO KESKEN
  @get('/')
  getProducts(req: Request, res: Response) {
    ProductController.productRepo
      .find()
      .then(result => {
        res.status(200).send({
          data: {
            result
          }
        });
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  // TODO KESKEN
  @get('/single/:id')
  getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res
        .status(ErrorResponseCodes._422)
        .send(
          new CustomError(
            'Cant handle characters in product id',
            ErrorNames.typeError
          )
        );

      return;
    }

    Promise.all<ProductProps[], ProductDiscount[]>([
      ProductController.productRepo.findById(id),
      ProductController.campaignRepo.findByProductId(id)
    ])
      .then(result => {
        const [_product, discount] = result;

        const product = ProductController.addDiscountRow(_product, discount)[0];

        if (!product) {
          const error = new CustomError(
            'Cannot find product',
            ErrorNames.notFound
          );

          error.responseCode = ErrorResponseCodes._404;
          console.log();

          throw error;
        }

        res.status(200).send({
          data: {
            product
          }
        });
      })
      .catch(error => {
        const { name, message, responseCode } = error;

        res.status(error.responseCode).send({
          error: {
            name,
            message,
            responseCode
          }
        });
      });
  }

  @get('/latest')
  getLatest(req: Request, res: Response) {
    Promise.all<ProductProps[], ProductDiscount[]>([
      ProductController.productRepo.findLatest(),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [_products, discounts] = result;

        const products = ProductController.addDiscountRow(_products, discounts);

        res.status(200).send({
          data: {
            products
          }
        });
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  @get('/mostpopulars')
  getMostPopular(req: Request, res: Response) {
    Promise.all<ProductProps[], ProductDiscount[]>([
      ProductController.productRepo.findMostPopulars(),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [_products, discounts] = result;

        const products = ProductController.addDiscountRow(_products, discounts);

        res.status(200).send({
          data: {
            products
          }
        });
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  static addDiscountRow(
    products: ProductProps[],
    discounts: ProductDiscount[]
  ): ProductProps[] {
    return products.map((product: ProductProps): ProductProps => {
      discounts.forEach((discount: ProductDiscount) => {
        if (product.productId === discount.productId) {
          product['discountPercentage'] = discount.discountPercentage;
          return;
        }
      });

      return product;
    });
  }
}
