
export class Commande {

  public id   :number;
  public id_client:number;
  public total:string;
  public creation_date :Date;
  public content:Array<ContentItem>;
  public state:CommandeState;

  constructor() {}
}
export class ContentItem{
  public name :string;
  public price :string;
  public quantity:number;
  constructor() {}
}
export enum CommandeState {
  WAITING= "Waiting",
  PENDING = "Pending",
  CANCELLED = "Cancelled",
  LIVRED="Livred"
}
