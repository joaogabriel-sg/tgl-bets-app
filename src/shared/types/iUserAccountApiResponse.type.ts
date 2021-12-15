interface IUserAccountBetApiResponse {
  id: number;
  choosen_numbers: string;
  user_id: number;
  game_id: number;
  price: number;
  created_at: string;
}

export interface IUserAccountApiResponse {
  id: number;
  email: string;
  name: string;
  token: string;
  bets: IUserAccountBetApiResponse[];
}
