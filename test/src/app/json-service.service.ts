import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JsonServiceService {
  url='http://localhost:3000/User'
  url2='http://localhost:3000/post'; // Added the url2
  url3='http://localhost:3000/Comment'; // Added the url2
  url4='http://localhost:3000/Like'; // Added the url2


  public currentUser: any = null;


  sendComment( Comments:any) {
    console.log(Comments);
    
   
    return this.http.post(`${this.url3}`, Comments);
  }
  sendLike( Like:any) {
    console.log(Like);
    
   
    return this.http.post(`${this.url4}`, Like);
  }
  
  AllLike(){
    return this.http.get(this. url4)
  }
 

 



  public setUser(user: any) {
    this.currentUser = user;
  }

  public getUser() {
    return this.currentUser;
  }

  public isRootUser() {
    return this.currentUser && this.currentUser.isRoot;
  }

  constructor(private http: HttpClient) { }
  UserSignup(User:any){
    return this.http.post(this.url,User)
   

  }
  UserLogin(Username: string, password: string) {
    return this.http.get<any[]>(this.url); // Change the type to any[]
  }

  postData( data: any) {
    return this.http.post(this.url2, data);
  }

  AllPost(){
    return this.http.get(this.url2)
  }
  
  AllComments(){
    return this.http.get(this.url3)
  }



}
