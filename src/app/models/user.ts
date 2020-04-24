import {stringify} from 'querystring';

export class User {
  public public_id       :string;
  public first_name      :string;
  public last_name       :string;
  public email           :string;
  public contact         :string;
  public municipality_id :string;
  public user_type    :User_type;
  constructor() {}
}



export enum User_type {
  ADMIN= "Admin",
  MUNICIPALITY = "Municipality",
  CLIENT = "Client",
  DELIVERY_MAN = "Delivery_man"
}

