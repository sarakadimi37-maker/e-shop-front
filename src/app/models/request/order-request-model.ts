export type OrderRequest = {

  status: string;
  item: {
    quantity: number;
    productId: number;
  }

}
