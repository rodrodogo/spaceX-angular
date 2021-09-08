import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LaunchesListComponent } from './launches-list.component';
import { Launch } from 'src/app/models/launch.model';
import { Observable, of } from 'rxjs';
import { LaunchesService } from 'src/app/services/launches.service';

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;
  const initialState = {};
  let launchesService: LaunchesService;

  let luanchesMock: Launch[] = [
    {
      flight_number: 1,
      mission_name: 'FalconSat',
      mission_id: [],
      upcoming: false,
      launch_year: 2006,
      launch_date_unix: 1143239400,
      launch_date_utc: new Date(),
      launch_date_local: new Date(),
      is_tentative: false,
      tentative_max_precision: 'hour',
      tbd: false,
      launch_window: 0,
      rocket: {
        rocket_id: 'falcon1',
        rocket_name: 'Falcon 1',
        rocket_type: 'Merlin A',
        first_stage: {
          cores: [
            {
              core_serial: 'Merlin1A',
              flight: 1,
              block: 1,
              gridfins: false,
              legs: false,
              reused: false,
              land_success: false,
              landing_intent: false,
              landing_type: 'asd',
              landing_vehicle: 'asd',
            },
          ],
        },
        second_stage: {
          block: 1,
          payloads: [
            {
              payload_id: 'FalconSAT-2',
              norad_id: [],
              reused: false,
              customers: ['DARPA'],
              nationality: 'United States',
              manufacturer: 'SSTL',
              payload_type: 'Satellite',
              payload_mass_kg: 20,
              payload_mass_lbs: 43,
              orbit: 'LEO',
              orbit_params: {
                reference_system: 'geocentric',
                regime: 'low-earth',

                periapsis_km: 400,
                apoapsis_km: 500,
                inclination_deg: 39,
              },
            },
          ],
        },
        fairings: {
          reused: false,
          recovery_attempt: false,
          recovered: false,
        },
      },
      ships: [],
      telemetry: {
        flight_club: 'null',
      },
      launch_site: {
        site_id: 'kwajalein_atoll',
        site_name: 'Kwajalein Atoll',
        site_name_long: 'Kwajalein Atoll Omelek Island',
      },
      launch_success: false,
      links: {
        mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
        mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
        reddit_campaign: 'asd',
        reddit_launch: 'asd',
        reddit_recovery: 'asd',
        reddit_media: 'asd',
        presskit: 'asd',
        article_link:
          'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
        wikipedia: 'https://en.wikipedia.org/wiki/DemoSat',
        video_link: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
        youtube_id: '0a_00nJ_Y88',
        flickr_images: [],
      },
      details: ' Engine failure at 33 seconds and loss of vehicle',
      static_fire_date_utc: new Date(),
      static_fire_date_unix: 1142553600,
      timeline: {
        webcast_liftoff: 54,
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LaunchesListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
    launchesService = TestBed.inject(LaunchesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('storeLaunches should store a new launch',async () => {
    spyOn(launchesService, 'getLaunches').and.returnValue(of(luanchesMock));
    component.storeLaunches();
    console.log(component.listLaunch);
    component.listLaunch.subscribe((launches: Launch[]) => {
      console.log(launches);
    })

    component.storeLaunches();
    component.storeLaunches();
    component.storeLaunches();
    
  });
});
