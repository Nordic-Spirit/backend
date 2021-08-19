import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
import { ProductRepo } from '../repos';
import { CustomError } from '../errors/CustomError';

@controller('/products')
class ProductController {
  static repo = new ProductRepo();

  @get('/all')
  async getProducts(req: Request, res: Response) {
    const result = await ProductController.repo.findAll();

    if (result instanceof CustomError) {
      const { name, message, responseCode } = result;

      return res.status(responseCode).send({ name, message });
    }

    res.status(200).send(result);
  }

  @get('/latest')
  async getLatest(req: Request, res: Response) {
    const result = await ProductController.repo.findLatest();

    if (result instanceof CustomError) {
      const { name, message, responseCode } = result;

      return res.status(responseCode).send({ name, message });
    }

    res.status(200).send(result);
  }
}
