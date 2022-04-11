export interface IAddress {
  id: string;
  user_id: string;
  street: string;
  number: string;
  district: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  created_at: Date;
  updated_at: Date;
}
