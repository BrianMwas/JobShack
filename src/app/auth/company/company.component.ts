import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/models/company';
import * as country from "../../../assets/JSON/country.json";
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  countries: any = (country as any).default;
  companyDataChanged: boolean = false;
  companyData: Company;
  companyJobs = []


  company : FormGroup =  new FormGroup({
    name: new FormControl("", Validators.required),
    website: new FormControl("", Validators.required),
    contact: new FormControl("", Validators.required),
    summary: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required)
  })
  companyCreated: boolean

  constructor(private companyService: CompanyService, private router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.companyService.getCompany()
		.subscribe(res => {
      this.companyData = new Company(res);
      this.companyCreated = true;
      this.companyJobs = [...this.companyData.jobs]
      this.populateCompany(this.companyData)
      console.log("company", this.companyJobs)
    })
    this.checkForStatusChanges()
  }


  checkForStatusChanges() {
    this.company.statusChanges.subscribe(x => {
      if(x == 'VALID') {
        this.companyDataChanged = true
      } else {
        this.companyDataChanged = false
      }
    })
  }

  populateCompany(c: Company) {
    this.company.get('country').setValue(c.country);
    this.company.get('summary').setValue(c.summary)
    this.company.get('name').setValue(c.name);
    this.company.get('website').setValue(c.website)
    this.company.get('contact').setValue(c.contact)
  }


  createJob() {
    this.router.navigate(['/dashboard/'+ this.companyData.id +'/jobs/new'])
  }

  changeCountry(e) {
    this.company.get('country').setValue(e.target.value);
  }

  onSubmit() {
    if(this.company.valid) {
      this.companyService.updateCompany(this.companyData.id, this.company.value)
      .subscribe(
      // ((res) => this.company.patchValue(res['data']))
      (res) => {
        console.log("res update", res)
        this.populateCompany(new Company(res))
      },
      (error) => {
        console.info("error", error)
        this.toastrService.danger("Company was not updated", "Company Update", { duration: 4000, preventDuplicates: true })
      },
      () => {
        this.toastrService.success("Company updated successfully", "Company update", { duration: 4000 })
      }
      )
    }
    console.log("contact", this.company.value)
  }

}
