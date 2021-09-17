import { launchesMock } from "src/assets/mocks/launchMock"
import { Launch } from "../models/launch.model";
import { AddLaunchAction, EditLaunchAction, LoadLaunchesSuccess, ResetLaunches } from "./launches.actions";
import { reducer } from "./launches.reducer";



describe('AddLaunchAction action', () => {
    const launch: Launch = {
        ...launchesMock[0],
        flight_number: 3,
        mission_name: 'mision new',
        launch_success: false,
        details: 'details new',
        rocket: {
            rocket_name: 'rocket launch',
            rocket_type: 'C',
        },
        launch_date_utc: '2006-03-24',
        launch_year: 2006
    };

    it('should store a launch', () => {

        const inicialState = [...launchesMock];
        const action = AddLaunchAction({ launch: launch });
        const newState = reducer(inicialState, action);
        const newLaunchesArray = [...launchesMock]
        newLaunchesArray.push({ ...launch });

        expect(newState).toEqual(newLaunchesArray);
    })
})


describe('EditLaunchAction action', () => {
    const launch: Launch = {
        ...launchesMock[0],
        mission_name: 'mision new',
        launch_success: false,
        details: 'details new',
        rocket: {
            rocket_name: 'rocket launch',
            rocket_type: 'C',
        },
        launch_date_utc: '2006-03-24',
        launch_year: 2006
    };
    it('should update the data of one item in the list', () => {
        const inicialState = [...launchesMock];
        const action = EditLaunchAction({ newLaunch: launch });
        const newState = reducer(inicialState, action);
        expect(newState.length).toEqual(2);
        expect(newState[0]).toEqual(launch);
    })
})

describe('LoadLaunchesSuccess action', () => {
    it('should receive all launches and store it', () => {
        const inicialState: Launch[] = [];

        const newLaunches = [
            ...launchesMock
        ];
        const action = LoadLaunchesSuccess({ launches: newLaunches });
        const newState = reducer(inicialState, action);
        expect(newState.length).toEqual(2);

    })
})



