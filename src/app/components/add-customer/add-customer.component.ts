import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  public Customer: ICustomer = {} as ICustomer;
  public errorMessage: string | null = null;
  public customerForm!: FormGroup;
  registerForm!: FormGroup;
  submitted = false;
  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      salutation:[''],
      initials: [''],
      firstname: [''],
      firstname_ascii: [''],
      gender: [''],
      firstname_country_rank: [''],
      firstname_country_frequency: [''],
      lastname: [''],
      lastname_ascii: [''],
      lastname_country_rank: [''],
      lastname_country_frequency: [''],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country_code: [''],
      country_code_alpha: [''],
      country_name: [''],
      primary_language_code: [''],
      primary_language: [''],
      balance: [''],
      phone_Number: [''],
      currency: [''],
  });



  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid)
      {
          return;
      }
      else
      {
        this.SaveCustomer();
      }
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  public SaveCustomer() {
    if (this.registerForm.valid) {
      this.submitted = true;
      console.log(this.registerForm);
      this.customerService.SaveCustomer(this.registerForm.value).subscribe(res => {
        alert('Customer Information Saved !');
        this.router.navigate(['customers']);
        this.registerForm.reset();
      });
    }
    else {
      //alert('something went wrong!')
      return;
    }
  }



}
