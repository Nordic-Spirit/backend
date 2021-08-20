import { Request, Response } from 'express';
import { controller, get } from './decorators';
import { ProductRepo } from '../repos';
import { CustomError } from '../errors/CustomError';
import { ProductCardProps } from '../repos/interfaces/Products';

@controller('/products')
class ProductController {
  static repo = new ProductRepo();

  // TODO KESKEN
  @get('/')
  async getProducts(req: Request, res: Response) {
    const result = await ProductController.repo.find();

    if (result instanceof CustomError) {
      const { name, message, sqlErrorCode, responseCode } = result;

      return res.status(responseCode).send({ name, message, sqlErrorCode });
    }

    res.status(200).send(result);
  }

  // TODO KESKEN
  @get('/single/:id')
  async getProduct(req: Request, res: Response) {
    const { id } = req.params;

    const result = await ProductController.repo.findById(Number(id));

    if (result instanceof CustomError) {
      const { name, message, sqlErrorCode, responseCode } = result;

      return res.status(responseCode).send({ name, message, sqlErrorCode });
    }

    res.send(req.params);
  }

  @get('/latest')
  async getLatest(req: Request, res: Response) {
    const result = await ProductController.repo.findLatest();

    if (result instanceof CustomError) {
      const { name, message, sqlErrorCode, responseCode } = result;

      return res.status(responseCode).send({ name, message, sqlErrorCode });
    }

    res.status(200).send(result);
  }

  @get('/mostpopular')
  async getMostPopular(req: Request, res: Response) {
    const result = await ProductController.repo.findMostPopulars();

    if (result instanceof CustomError) {
      const { name, message, sqlErrorCode, responseCode } = result;

      return res.status(responseCode).send({ name, message, sqlErrorCode });
    }

    res.status(200).send(result);
  }

  // sendResponse<T>(res: Response, result: CustomError | T, successCode: number) {
  //   if (result instanceof CustomError) {
  //     const { name, message, sqlErrorCode, responseCode } = result;

  //     return res.status(responseCode).send({ name, message, sqlErrorCode });
  //   }

  //   res.status(successCode).send(result);
  // }
}
