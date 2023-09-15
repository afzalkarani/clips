import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  inSubmission = false
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'blue'

  constructor(private auth:AngularFireAuth){

  }
  credentials = {
    email:'',
    password:''
  }

  async login()
  {
    this.inSubmission = true
    this.showAlert = true
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = 'blue'


   try{
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
         
   }
   catch(e)
   {
    this.inSubmission = false
    this.showAlert = true
    this.alertMsg = `An unexpected error occurred. ${e}`
    this.alertColor = 'red'
    return
   }

   this.alertMsg = 'Success! You\'ve logged in.'
   this.alertColor = 'green'

  }
}
