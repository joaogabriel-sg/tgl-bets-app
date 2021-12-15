interface INewBet {
  id: number;
  numbers: number[];
}

export interface ISaveNewBet {
  games: INewBet[];
}
