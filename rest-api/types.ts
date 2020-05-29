export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface NewProduct {
  name: string;
  description: string;
  price: number;
}

export const isNewProduct = (arg: any): arg is NewProduct => {
  return arg &&
    (arg.name && typeof arg.name === "string") &&
    (arg.description && typeof arg.description === "string") &&
    (arg.price && typeof +arg.price === "number");
};

export interface UpdateProduct {
  name?: string;
  description?: string;
  price?: number;
}

export interface UpdateProductRequestBody {
  type: string;
  value: UpdateProduct;
}

export const isUpdateProduct = (arg: any): arg is UpdateProduct => {
  let isNameString = true;
  let isDescriptionString = true;
  let isPriceNumber = true;

  if (arg.name) {
    isNameString = typeof arg.name === "string";
  }
  if (arg.description) {
    isDescriptionString = typeof arg.description === "string";
  }
  if (arg.price) {
    // NaN is not equal to itself and its type is number...
    isPriceNumber = !isNaN(Number(arg.price));
  }

  return arg && isNameString && isDescriptionString && isPriceNumber;
};

export interface Ctx {
  params: any;
  request: any;
  response: any;
}

export interface addProductRequestBody {
  type: string;
  value: NewProduct;
}
