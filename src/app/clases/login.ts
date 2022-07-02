export class Login {
  private username:string;
  private password:string;
  constructor(username:string,password:string){
		this.username=username;
		this.password=password;
	}
  setUsername(u:string){
    this.username=u;
  }
  getUsername(){
    return this.username
  }
  setPassword(pss:string){
    this.password=pss;
  }
  getPassword(){
    return this.password;
  }
}
