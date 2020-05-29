import {
  Product,
  Ctx,
  isNewProduct,
  addProductRequestBody,
  NewProduct,
  isUpdateProduct,
  UpdateProduct,
  UpdateProductRequestBody,
} from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const products: Product[] = [
  { id: "1", name: "prod-1", description: "prod-1 description", price: 1.99 },
  { id: "2", name: "prod-2", description: "prod-2 description", price: 2.99 },
  { id: "3", name: "prod-3", description: "prod-3 description", price: 3.99 },
  { id: "4", name: "prod-4", description: "prod-4 description", price: 4.99 },
];

/**
 * @desc Get all products
 * @route GET /api/v1/products
 * @param context 
 */
export const getProducts = ({ response }: Ctx) => {
  response.body = {
    success: true,
    data: products,
  };
};

/**
 * @desc Get single product
 * @route GET /api/v1/products/:id
 * @param context 
 */
export const getProduct = ({ params, response }: Ctx) => {
  const id: string = params.id;

  const product: Product | undefined = products.find((p) => p.id === id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      error: "No product found",
    };
  }
};

/**
 * @desc Add single product
 * @route POST /api/v1/products
 * @param context 
 */
export const addProduct = async ({ request, response }: Ctx) => {
  if (request.hasBody) {
    const body: addProductRequestBody = await request.body();

    const newProduct: NewProduct = body.value;

    if (isNewProduct(newProduct)) {
      (newProduct as Product).id = v4.generate();
      products.push((newProduct as Product));

      response.status = 201;
      response.body = {
        success: true,
        data: newProduct,
      };

      return;
    }
  }

  response.status = 400;
  response.body = {
    success: false,
    error: "Please enter a valid product",
  };
};

/**
 * @desc Update single product
 * @route PUT /api/v1/products/:id
 * @param context 
 */
export const updateProduct = async ({ params, request, response }: Ctx) => {
  const id: string = params.id;

  if (request.hasBody) {
    const body: UpdateProductRequestBody = await request.body();
    let existingProduct: Product | undefined = products.find((p) =>
      p.id === id
    );

    if (isUpdateProduct(body.value)) {
      if (existingProduct) {
        existingProduct = {
          ...existingProduct,
          ...body.value,
        };

        response.status = 200;
        response.body = {
          success: true,
          data: existingProduct,
        };

        return;
      } else {
        response.status = 404;
        response.body = {
          success: false,
          error: "No product found",
        };

        return;
      }
    }
  }

  response.status = 400;
  response.body = {
    success: false,
    error: "Please enter a valid product",
  };
};

/**
 * @desc Delete single product
 * @route DELETE /api/v1/products/:id
 * @param context 
 */
export const deleteProduct = ({ params, response }: Ctx) => {
  const id: string = params.id;

  const existingProductIndex: number = products.findIndex((p) => p.id === id);

  if (existingProductIndex !== -1) {
    const [deletedProduct]: Product[] = products.splice(
      existingProductIndex,
      1,
    );
    response.status = 200;
    response.body = {
      success: true,
      data: deletedProduct,
    };

    return;
  }

  response.status = 404;
  response.body = {
    success: false,
    error: "Product not found",
  };
};
