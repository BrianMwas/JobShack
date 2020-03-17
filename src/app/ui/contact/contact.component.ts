import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SEOService } from '../../shared/services/seo.service';
import { Component, OnInit } from "@angular/core";
import { filter, map, mergeMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
	selector: "app-contact",
	templateUrl: "./contact.component.html",
	styleUrls: ["./contact.component.scss"]
})

export class ContactComponent implements OnInit {
	constructor(
    private formBuilder: FormBuilder,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected toastrService: NbToastrService) {}

  contactForm: FormGroup;

	ngOnInit() {
		this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      message: ['', Validators.minLength(10)]
    })
  }

  submit() {
    if(this.contactForm.valid) {
      console.log("contact", this.contactForm.value)
      this.toastrService.success("Thank you " + this.contactForm.get('name').value + ", we will get back to you", 'Thank you', { duration: 2000 })
      this.contactForm.reset()
    }
  }

}
