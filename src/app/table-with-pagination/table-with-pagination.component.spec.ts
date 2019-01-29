import 'hammerjs';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { TableWithPaginationComponent } from './table-with-pagination.component';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { CarService } from '../car.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('TableWithPaginationComponent', () => {
  let component: TableWithPaginationComponent;
  let fixture: ComponentFixture<TableWithPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatComponentsModule,
        ReactiveFormsModule
      ],
      providers: [CarService],
      declarations: [TableWithPaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter vehicles in the DataSource', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      fixture = TestBed.createComponent(TableWithPaginationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const cars_reqs = httpMock.match('/api/v1/cars');
      cars_reqs.forEach((req: TestRequest) => {
        expect(req.request.method).toEqual('GET');
        req.flush([
          {
            id: 1,
            make: 'Jeep',
            model: 'CJ-7',
            year: 1985,
            color: 'Grey',
            city: 'Alameda',
            state: 'CA'
          },
          {
            id: 2,
            make: 'Ford',
            model: 'F150',
            year: 2001,
            color: 'Silver',
            city: 'Concord',
            state: 'CA'
          },
          {
            id: 3,
            make: 'Dodge',
            model: 'Ram Van 1500',
            year: 1997,
            color: 'Violet',
            city: 'Beaumont',
            state: 'TX'
          },
          {
            id: 4,
            make: 'Ford',
            model: 'Escape',
            year: 2010,
            color: 'Goldenrod',
            city: 'Springfield',
            state: 'OH'
          }
        ]);
      });

      const makes_reqs = httpMock.match('/api/v1/makes');
      makes_reqs.forEach((req: TestRequest) => {
        expect(req.request.method).toEqual('GET');
        req.flush(['Jeep', 'Ford', 'Dodge']);
      });

      const years_reqs = httpMock.match('/api/v1/years');
      years_reqs.forEach((req: TestRequest) => {
        expect(req.request.method).toEqual('GET');
        req.flush([1985, 2001, 1997, 2010]);
      });

      component.makesFilter.setValue(['Ford']);
      component.yearsFilter.setValue(['2010']);
      fixture.whenStable().then(() => {
        expect(component.dataSource.filteredData[0].make).toBe('Ford');
        expect(component.dataSource.filteredData[0].year).toBe(2010);
        expect(component.dataSource.filteredData[0].model).toBe('Escape');
        expect(component.dataSource.filteredData[0].color).toBe('Goldenrod');
      });
    }
  ));
});
