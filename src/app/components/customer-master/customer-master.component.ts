import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-master',
  templateUrl: './customer-master.component.html',
  styleUrls: ['./customer-master.component.css']
})
export class CustomerMasterComponent implements OnInit {
  public customers: ICustomer[] = [];
  public errorMessage: string | null = null;
  constructor(private customerservice: CustomerService) { }

  ngOnInit(): void {
    this.GetAllCustomers();
  }

  public GetAllCustomers() {
    this.customerservice.getAllCustomers().subscribe((data: ICustomer[]) => {
      this.customers = data;
    }, (erorr) => {
      this.errorMessage = erorr;
    });
  }

  public clickDeleteContact(customerId: string | undefined) {
    if (confirm('Are You Sure to Delete ?')) {
      if (customerId) {
        console.log(customerId);
        this.customerservice.deleteCustomer(customerId).subscribe((data) => {
          this.GetAllCustomers();
        }, (error) => {
          this.errorMessage = error;
        });
      }
    }
  }

}
