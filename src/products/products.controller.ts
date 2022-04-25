import { Controller, Get, Req, Session } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  hello(@Session() session: Record<string, any>) {
    // session.visits = 1;

    return this.productsService.hello();
  }

  @Get('get')
  get(@Session() session: Record<string, any>) {
    // console.log(session.visits);

    return 'sdfkdsjkl';
  }
}
