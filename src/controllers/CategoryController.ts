import { Request, Response } from 'express';
import { controller, get } from './decorators';
import {
  CategoryProps,
  CombinedCategories,
  SubCategoryProps
} from '../interfaces';
import { CategoryRepo } from '../repos';

@controller('/categories')
class CategoryController {
  static categoryRepo = new CategoryRepo();

  @get('/')
  getCategories(req: Request, res: Response) {
    Promise.all<CategoryProps[], SubCategoryProps[]>([
      CategoryController.categoryRepo.findCategories(),
      CategoryController.categoryRepo.findSubCategories()
    ])
      .then(result => {
        const [categories, subCategories] = result;

        const combinedCategories = categories.map(
          ({ categoryId, categoryName }: CategoryProps): CombinedCategories => {
            return {
              categoryId,
              categoryName,
              subCategories: subCategories.flatMap(
                ({
                  subCategoryId,
                  subCategoryName,
                  subCategoryCategoryId
                }): SubCategoryProps | [] => {
                  if (categoryId !== subCategoryCategoryId) return [];

                  return {
                    subCategoryId,
                    subCategoryName,
                    subCategoryCategoryId
                  };
                }
              )
            };
          }
        );

        res.status(200).send({
          data: {
            combinedCategories
          }
        });
      })
      .catch(error => {
        console.log(error);

        res.status(422).send(error);
      });
  }
}
