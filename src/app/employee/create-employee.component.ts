import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { format } from 'url';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
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
        fullName: [''],
        email: [''],
        skills: this.fb.group({
          skillName: [''],
          yoExp: ['']
        })
      });
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
  }
}
