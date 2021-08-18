import { Request, Response } from 'express';
import { controller, get, post } from './decorators';
import { ProductRepo } from '../repos';

@controller('/products')
class ProductController {
  @get('/all')
  async getProducts(req: Request, res: Response) {
    const x = await ProductRepo.findAll();

    console.log(x);
    res.send('ss');
  }
}
