import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms"
import { ValidationService } from "../../services/validation.service"

@Component({
  selector: 'error-message',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent {

	@Input()
	control: FormControl

  constructor() { }

  get errorMessage() {
  	for(let propertyName in this.control.errors) {
  		if(this.control.errors.hasOwnProperty(propertyName)) {
  			return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors)
  		}
  	}
  	return null
  }

}
