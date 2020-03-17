import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
	let minRequiredLength = validatorValue['minlength'].requiredLength
	
  	let config = {
  		'required': 'This field is required',
  		'minlength': `Minimum required length is ${minRequiredLength}`,
  		'maxlength': `Maxmum required is length ${validatorValue.requiredLength}`
  	}

  	return config[validatorName]
  }
}
