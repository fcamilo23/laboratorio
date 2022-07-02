/*export class Token {
  private token: String="";
  private expiration:String=""
  constructor(){}
  setToken(t:String){
    this.token=t;
  }
  getToken(){
    return this.token;
  }
  setExpiration(e:String){
    this.expiration=e;
  }
  getExpiration(){
    return this.expiration;
  }
}
*/

export class Token {
    
  public token: string;
  public expiration: string;

  constructor(token: string, expiration: string) {
      this.token = token;
      this.expiration = expiration;
  }
}