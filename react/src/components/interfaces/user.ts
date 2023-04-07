export interface favInterface {
  title: string;
  price: number;
  productId: string;
  path: string;
  _id: string;
}

export interface cartInterface extends favInterface {
  userId: string;
  count: number;
}

export interface favInitialState {
  fav: favInterface[];
}

export interface imagesInterface {
  productPath: string;
  _id: string;
}
