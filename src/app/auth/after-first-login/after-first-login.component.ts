import { Router } from '@angular/router';
import {  FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as country from "../../../assets/JSON/country.json";
import { UserService } from "../user.service"
import { NbAuthService, NbAuthJWTToken } from "@nebular/auth"


@Component({
  selector: 'app-after-first-login',
  templateUrl: './after-first-login.component.html',
  styleUrls: ['./after-first-login.component.scss']
})
export class AfterFirstLoginComponent implements OnInit {

  profileForm = this.fb.group({
    imageUrl: [''],
    username: ['', [Validators.required, Validators.minLength(7)]],
    telephoneNumber: ['', Validators.required],
    description: ['', Validators.required],
    role: ['', Validators.required]
  })

  fileStackApiKey: string;
  userId: string;



  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private authService: NbAuthService) {
  }

  ngOnInit() {
    this.fileStackApiKey = "10ea8b7a49a4db2d14212cd2bfa1d52e85f69f5a"

    this.authService.onTokenChange()
    .subscribe((token : NbAuthJWTToken) => {
      this.userId = token.getPayload()['userId']
      })

  }

  get f() {
    return this.profileForm.controls
  }

  profileSubmit() {

    if(this.profileForm.invalid) {
      return;
    }

    this.userService.addUserProfile(this.userId, this.profileForm.value).subscribe(
      (data) => {
        console.log("data", data);
      },
      (error) => {
        // this.profileForm.reset();
        console.log("error", error)
      },
      () => {
        console.log("person");
        
        if (this.profileForm.get("role").value == "employer") {
          console.log("routing to the company");
          
          this.router.navigate(['create-company'])
          this.profileForm.reset()
        } else {
          this.router.navigate(['dashboard'])
          this.profileForm.reset()
          // console.log("profileForm", this.profileForm.value)
        }
      }
    )

  }
}
