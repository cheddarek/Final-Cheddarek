export class pagination_details{
  public page :number;
  has_prev:boolean;
  has_next:boolean;

  constructor(page: number, has_prev: boolean, has_next: boolean) {
    this.page = page;
    this.has_prev = has_prev;
    this.has_next = has_next;
  }
}
