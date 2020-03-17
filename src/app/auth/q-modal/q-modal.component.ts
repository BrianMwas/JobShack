import { Component } from '@angular/core';
import { NbDialogRef, NbDateService } from "@nebular/theme";
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Component({
  selector: 'q-modal',
  templateUrl: './q-modal.component.html',
  styleUrls: ['./q-modal.component.scss']
})
export class QModalComponent {

	max: Date;
	min: Date;

	submitted: boolean = false;

		
  constructor(
  	public dialogRef: NbDialogRef<QModalComponent>,
  	 private dateService: NbDateService<Date>
   ) {
  		this.min = this.dateService.addYear(this.dateService.today(), -20)
		this.max = this.dateService.addDay(this.dateService.today(), 0)
    }

	
	qForm: FormGroup = new FormGroup ({
		_id: new FormControl(new Date().getDate()),
		startDate: new FormControl('', Validators.required),
		endDate: new FormControl('', Validators.required),
		institute: new FormControl('', Validators.required),
		description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
		qualificationType: new FormControl('', Validators.required)
	})

	get qError() {
		return this.qForm.controls
	}
	
cancel() {
	this.qForm.reset();
	this.dialogRef.close()
}

  onSubmit() {
  	this.submitted = true
  	if(this.qForm.invalid) {
  		return;
  	}
  	this.dialogRef.close(this.qForm.value)
  }
}
