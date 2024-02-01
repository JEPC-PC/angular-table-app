import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Customer } from '../models/Customer';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Service } from '../services/Service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {

  displayedColumns = ['id', 'customer_name', 'status', 'extra1'];
  @ViewChild('paginator') paginator: MatPaginator | any;
  @ViewChild('empTbSort') empTbSort = new MatSort();

  dataSource = new MatTableDataSource<Customer>();

  constructor(
    public dialog: MatDialog,
    private _httpClient: HttpClient,
    private service: Service,
    private router: Router
  ) {}

  selection!: Customer;
  valueTable!: Customer;


  ngOnInit(): void {
  
    this.service.getListData().subscribe((res: any) => {
      this.dataSource.data = res;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListData(): any {
    let listCustomers: any[] = [];
    this.service.getListData().subscribe(
      (data) => {
        listCustomers = data;
        console.log(JSON.stringify(data));
        console.log(listCustomers);
      },
      (error) => {}
    );
  }

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<Customer>();
    this.empTbSort.disableClear = true;
    this.dataSource.sort = this.empTbSort;
    this.dataSource.paginator = this.paginator;
  }

  cellClicked(element: any) {
    console.log(element.customer_name);
    this.valueTable = element.id;
    this.service.setCustomer(this.valueTable);
  }

}
