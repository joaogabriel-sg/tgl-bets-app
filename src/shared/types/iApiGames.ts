import { ITypeOfGame } from "./iTypeOfGame.type";

export interface IApiGames {
  min_cart_value: number;
  types: ITypeOfGame[];
}
