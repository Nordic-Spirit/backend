import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  hello() {
    return 'Hello World';
  }
}
