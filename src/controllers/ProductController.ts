import { Request, Response } from 'express';
import { controller, get } from './decorators';
import { ProductRepo } from '../repos';
import { CustomError } from '../errors/CustomError';
import { CampaignRepo } from '../repos/CampaignRepo';
import {
  ProductProps,
  ProductCardProps,
  CampaignProps,
  CampaignDiscount
} from '../repos/interfaces';
import { ErrorNames, ErrorResponseCodes } from '../errors';

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
        res.status(200).send(result);
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
          new CustomError('Cant handle characters in id', ErrorNames.typeError)
        );

      return;
    }

    Promise.all<ProductProps[], CampaignDiscount[]>([
      ProductController.productRepo.findById(id),
      ProductController.campaignRepo.findByProductId(id)
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
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }

  @get('/latest')
  getLatest(req: Request, res: Response) {
    Promise.all<ProductCardProps[], CampaignDiscount[]>([
      ProductController.productRepo.findLatest(),
      ProductController.campaignRepo.findDiscounts()
    ])
      .then(result => {
        const [products, discounts] = result;

        res.status(200).send({
          products,
          discounts
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
    ProductController.productRepo
      .findMostPopulars()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(error => {
        const { name, message, sqlErrorCode } = error;

        res
          .status(ErrorResponseCodes._422)
          .send({ name, message, sqlErrorCode });
      });
  }
}
