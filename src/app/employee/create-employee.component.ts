import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  disableSave = false;
  validationMessages = {
    'fullName' : {
      'required': 'Full name is required',
      'minlength': 'Full name must be greater than 2 characters',
      'maxlength': 'Full name must be less than 10 characters'
    },
    'email': {
      'required': 'Email is required'
    },
    'skillName': {
      'required': 'Skill Name is required'
    },
    'yoExp': {
      'required': 'Year of experience is required'
    }
  };

  formErrors = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'yoExp': ''
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    //  implicitly implement reactive form
    //  this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     yoExp: new FormControl()
    //   })
    // });

    // Explictly implement reactive form with FormBuilder
      this.employeeForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        email: ['', [Validators.required, emailDomain('tradesocio.com')]],
        skills: this.fb.group({
          skillName: ['', Validators.required],
          yoExp: ['', Validators.required]
        })
      });

      // this.employeeForm.get('fullName').valueChanges.subscribe(value => {
      //   console.log(value);
      // });
  }
  saveEmployee(): void {
    console.log(this.employeeForm.value);
  }
  loadData(): void {
    if (this.employeeForm.value) {
      this.employeeForm.patchValue({
        fullName: this.employeeForm.controls.fullName.value,
        email: this.employeeForm.controls.email.value,
        skills: {
          skillName: this.employeeForm.controls.skills.value.skillName,
          yoExp: this.employeeForm.controls.skills.value.yoExp
        }
      });
      console.log(this.employeeForm.value);
    }
    this.employeeForm.disable();
    this.disableSave = !this.disableSave;
  }
}
function emailDomain(domainName: string) {
  return (control: AbstractControl): { [ key: string ]: any} | null => {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
    return null;
  } else {
    return { 'emailDomain': true };
  }
};
}
