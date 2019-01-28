import { TestBed, inject } from '@angular/core/testing';

import { CarService } from './car.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('CarService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    })
  );

  it('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });

  it('should fetch vehicle data from the Cars API endpoint', inject(
    [HttpTestingController, CarService],
    (httpMock: HttpTestingController, carService: CarService) => {
      carService.getCars().subscribe(data => {
        expect(data.length).toBe(4);
        expect(data[0].model).toEqual('CJ-7');
      });

      const req = httpMock.expectOne('/api/v1/cars');
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
    }
  ));
});
