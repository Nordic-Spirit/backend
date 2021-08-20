import { Request, Response, NextFunction } from 'express';
import { controller, get, post, use } from './decorators';
import { ProductRepo } from '../repos';
import { CustomError } from '../errors/CustomError';

@controller('/products')
class ProductController {
  static repo = new ProductRepo();

  @get('/')
  async getProducts(req: Request, res: Response) {
    const result = await ProductController.repo.find();

    if (result instanceof CustomError) {
      const { name, message, responseCode } = result;

      return res.status(responseCode).send({ name, message });
    }

    res.status(200).send(result);
  }

  @get('/product/:id')
  async getProduct(req: Request, res: Response) {
    const { id } = req.params;

    res.send(req.params);
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
