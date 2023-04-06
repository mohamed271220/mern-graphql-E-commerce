export interface favInterface {
  productId: string;
}

export interface cartInterface extends favInterface {
  userId: string;
  count: number;
}

export interface favInitialState {
  fav: favInterface[];
}
