export class Token {
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
