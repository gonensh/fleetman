import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../car.service';

@Component({
  selector: 'app-table-with-pagination',
  templateUrl: './table-with-pagination.component.html',
  styleUrls: ['./table-with-pagination.component.scss']
})
export class TableWithPaginationComponent implements OnInit {
  cars: string[] = [];
  makes: string[] = [];
  years: number[] = [];
  states: string[] = [];
  carsLoaded: Promise<Boolean>;

  displayedColumns: string[] = ['year', 'make', 'model', 'color'];
  dataSource: MatTableDataSource<Car>;

  constructor(carService: CarService) {
    this.carsLoaded = new Promise((resolve, reject) => {
      carService.getCars().subscribe(cars => {
        if (!Array.isArray(cars)) {
          reject(
            `Expected carService.getCars() to return an array, instead got: ${cars}`
          );
        }
        this.dataSource = new MatTableDataSource<Car>(cars);
        this.dataSource.filterPredicate = this.tableFilter();
        resolve(true);
      });
    });

    carService.getMakes().subscribe(makes => (this.makes = makes));
    carService.getYears().subscribe(years => (this.years = years));
  }

  makesFilter = new FormControl();
  yearsFilter = new FormControl();
  statesFilter = new FormControl();
  filterValues = {
    year: '',
    make: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.carsLoaded.then(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.makesFilter.valueChanges.subscribe(make => {
      this.filterValues.make = make;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.yearsFilter.valueChanges.subscribe(year => {
      this.filterValues.year = year;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return (
        (searchTerms.year.length > 0
          ? searchTerms.year.indexOf(data.year.toString()) > -1
          : true) &&
        (searchTerms.make.length > 0
          ? searchTerms.make.indexOf(data.make.toString()) > -1
          : true)
      );
    };
    return filterFunction;
  }
}

export interface Car {
  id: number;
  year: number;
  make: string;
  model: string;
  color: string;
  city: string;
  state: string;
}
