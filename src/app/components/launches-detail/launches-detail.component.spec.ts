import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SafePipe } from 'src/app/pipes/safe.pipe';

import { LaunchesDetailComponent } from './launches-detail.component';

describe('LaunchesDetailComponent', () => {
  let component: LaunchesDetailComponent;
  let fixture: ComponentFixture<LaunchesDetailComponent>;
  const initialState = {  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ LaunchesDetailComponent, SafePipe ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
