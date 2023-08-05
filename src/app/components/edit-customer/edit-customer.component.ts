import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  public Customer: ICustomer = {} as ICustomer;
  public CustomerId: string | null = null;
  public errorMessage: string | null = null;
  public customerForm!: FormGroup;
  public customerIdToUpdate!:string;
  registerForm!: FormGroup;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.CustomerId = param.get('id');
    });
    if (this.CustomerId) {

      this.customerService.getCustomer(this.CustomerId).subscribe((data) => {
        this.Customer = data;
      }, (error) => {
        this.errorMessage = error;
      });
    }
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
      this.submitUpdate();
    }
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}


  public submitUpdate(){
    if(this.CustomerId){
      this.customerService.updateCustomer(this.Customer,this.CustomerId).subscribe((data)=>{
        this.router.navigate(['/']).then();
        alert("Customer Information Updated");
        },(error)=>{
        this.errorMessage=error;
        this.router.navigate(['/customers/edit/${this.customerId}']).then();
        });
    }
  }




}
