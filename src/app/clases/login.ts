export class Login {
  private username:String="";
  private password:String="";
  constructor(username:string,password:string){
		this.username=username;
		this.password=password;
	}
  setUsername(u:String){
    this.username=u;
  }
  getUsername(){
    return this.username
  }
  setPassword(pss:String){
    this.password=pss;
  }
  getPassword(){
    return this.password;
  }
}
