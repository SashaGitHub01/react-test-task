import { makeAutoObservable } from "mobx";
import { STATUSES } from "../constants";
import { getProduct, getSizes } from "../services/api";

export class ProductStore {
  sizes = [];
  status = STATUSES.INIT; // init | loading | success | error
  product = null;
  color = null;
  size = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get itemWithColor() {
    if (this.color && this.product) {
      const productColors = this.product.colors;
      const item = productColors.find((color) => color.id === this.color);
      return item ? item : productColors[0];
    }

    return null;
  }

  setColor(id) {
    this.color = +id;
  }

  setSize(id) {
    this.size = +id;
  }

  *fetchItem(id) {
    try {
      this.status = STATUSES.LOADING;
      const res = yield getProduct(id);
      this.product = res;
      this.status = STATUSES.SUCCESS;
    } catch (err) {
      console.log({ err });
      this.status = STATUSES.ERROR;
    }
  }

  *fetchSizes(id) {
    try {
      const res = yield getSizes(id);
      this.sizes = res;
    } catch (err) {
      console.log({ err });
    }
  }
}
