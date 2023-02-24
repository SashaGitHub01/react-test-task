import { makeAutoObservable } from "mobx";
import { STATUSES } from "../constants";
import { getProducts } from "../services/api";

export class ProductsStore {
  _products = [];
  status = STATUSES.INIT; // init | loading | success | error

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  *fetchItems() {
    try {
      this.status = STATUSES.LOADING;
      const res = yield getProducts();
      this._products = res;
      this.status = STATUSES.SUCCESS;
    } catch (err) {
      console.log({ err });
      this.status = STATUSES.ERROR;
    }
  }

  // extract all products for list
  get productsPreview() {
    if (this.status === STATUSES.SUCCESS) {
      return this._products.reduce((acc, item) => {
        const colors = item.colors.map((color) => ({
          ...color,
          productId: item.id,
          productName: item.name,
        }));
        acc.push(...colors);

        return acc;
      }, []);
    }

    return null;
  }
}
