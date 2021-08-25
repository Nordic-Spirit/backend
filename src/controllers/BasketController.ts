import { controller, get, post, bodyValidator } from './decorators';
import { Request, Response } from 'express';
import { BasketRepo } from '../repos';
import { ErrorNames } from '../errors';

@controller('/basket')
class BasketController {
  static basketRepo = new BasketRepo();

  @bodyValidator('productId')
  @post('/')
  addProduct(req: Request, res: Response) {
    const productId: number = req.body.productId;
    const sessionId: string = req.session.id;

    BasketController.basketRepo
      .insert(sessionId, productId)
      .then(result => {
        console.log(result);

        res.status(200).send({
          data: {
            result
          }
        });
      })
      .catch(error => {
        if (error.sqlErrorCode === '23502') {
          res.status(422).send({
            error: {
              name: ErrorNames.notFound,
              message: "Can't find product with that id"
            }
          });

          return;
        }

        res.status(422).send({ error });
      });
  }
}
