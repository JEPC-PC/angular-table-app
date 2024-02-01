import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Service } from '../services/Service';
import { Customer } from '../models/Customer';
import { profile } from '../models/Profile';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  profileList: profile[] | any;
  dataSelect: any[] = [];

  selectCustomer$ = this.service.selectCustomer$;

  constructor(
    private _httpClient: HttpClient,
    private service: Service,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  cprofileForm = {
    customer_name: '',
    customer_contact_name: '',
    phone_number: '',
    second_phone_number: '',
    street: '',
    sender_account: '',
    paymnet_account: '',
    shipment_credential: '',
    prefered_serivce: '',
    second_serivce: '',
    prefered_packaging: '',
    dynamiccnpj: '',
  };

  vID: Customer = {
    id: '',
    name: '',
    status: '',
    extra: '',
  };

  ngOnInit(): void {
    // inputs are filled when init
    this.getListData();

    //when id in select change
    this.service.getprofiles().subscribe((data: any) => {
      this.profileList = data;
    });

    //fill select
    this.dataSelect = this.retrieveTutorials();
  }

  retrieveTutorials(): any {
    this.service.getprofiles().subscribe(
      (data) => {
        this.dataSelect = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    return this.dataSelect;
  }

  changeClient(value: any) {
    const all = this.profileList.filter((obj: any) => {
      return obj.id === value;
    });

    this.profileList.forEach((n: any) => {
      if (value == n.id) {
        this.cprofileForm.customer_name = n.cname;
        this.cprofileForm.customer_contact_name = n.ccontact;
        this.cprofileForm.phone_number = n.phone;
        this.cprofileForm.second_phone_number = n.second_phone;
        this.cprofileForm.street = n.street;
        this.cprofileForm.sender_account = n.senderaccount;
        this.cprofileForm.paymnet_account = n.paymnetaccount;
        this.cprofileForm.shipment_credential = n.shipmentcredential;
        this.cprofileForm.prefered_serivce = n.preferedservice;
        this.cprofileForm.second_serivce = n.secondservice;
        this.cprofileForm.prefered_packaging = n.packaging;
        this.cprofileForm.dynamiccnpj = n.id;
      }
    });
  }

  getListData(): any {
    let listCustomers: any[] = [];

    this.service.selectCustomer$.subscribe((ip) => {
      this.vID = ip;
      console.log(ip);
    });

    // console.log(this.vID);
    this.service.getprofiles().subscribe(
      (data) => {
        listCustomers = data;
        // console.log(JSON.stringify(data));
        // console.log(listCustomers);

        const all = listCustomers.filter((obj: any) => {
          return obj.id === this.vID;
        });
        // console.log(all);

        listCustomers.forEach((n: any) => {
          if (this.vID == n.id) {
            this.cprofileForm.customer_name = n.cname;
            this.cprofileForm.customer_contact_name = n.ccontact;
            this.cprofileForm.phone_number = n.phone;
            this.cprofileForm.second_phone_number = n.second_phone;
            this.cprofileForm.street = n.street;
            this.cprofileForm.sender_account = n.senderaccount;
            this.cprofileForm.paymnet_account = n.paymnetaccount;
            this.cprofileForm.shipment_credential = n.shipmentcredential;
            this.cprofileForm.prefered_serivce = n.preferedservice;
            this.cprofileForm.second_serivce = n.secondservice;
            this.cprofileForm.prefered_packaging = n.packaging;
            this.cprofileForm.dynamiccnpj = n.id;
          }
        });
      },
      (error) => {}
    );
  }

  public addRecord() {
    // this.dialog.open(this.addFilialComponent);
  }

}
