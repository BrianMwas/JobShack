import { Component, OnInit } from '@angular/core';
import * as country from "../../../assets/JSON/country.json";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CompanyService } from '../company.service.js';
import { NbToastrService } from '@nebular/theme';
import { Company } from 'src/app/shared/models/company.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {
  countries: any = (country as any).default;
  submitted: boolean = false;
  constructor(private fb : FormBuilder, private companyService: CompanyService, public toastrService: NbToastrService, private router: Router) { }

  companyForm: FormGroup;
  newCompany: Company

  ngOnInit() {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      website: ['', [Validators.minLength(7), Validators.required]],
      contact: ['', Validators.required],
      summary: ['', Validators.required],
      address: ['', Validators.minLength(5)],
      country: ['', Validators.required]
  })
  }

  changeCountry(e) {
    this.companyForm.get('country').setValue(e.target.value);
  }

  get f() {
    return this.companyForm.controls
  }

  submitCompany() {
    this.submitted = true;
    if(this.companyForm.invalid) {
      return;
    }

    let data = this.companyForm.value;

    this.companyService.create(data).subscribe(
      (res) => {
        this.toastrService.info("Please wait while we create the new company", "Create new company", { preventDuplicates: true, icon: 'bulb-outline', iconPack: 'eva' })
        this.newCompany = new Company(res);
      },
      (error) => {
        this.toastrService.danger("Sorry something happenend "+error, "Error", { duration: 4000, preventDuplicates: true, icon: 'alert-triangle-outline', iconPack: 'eva' })
      },
      () => {
        this.toastrService.success(`${this.newCompany.name} was created successfuly`, "Company creation", { duration: 4000, preventDuplicates: true, icon: 'checkmark-circle-outline', iconPack:  'eva' })
        this.router.navigate(['dashboard'])
      }
    )

    this.companyForm.reset()
  }

}
