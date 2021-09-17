import { Launch } from "../models/launch.model";
import { launchesMock } from "src/assets/mocks/launchMock";
import { selectLauch, selectLaunches } from "./launches.selectors";

describe("Selectors", () => {
  const initialState: Launch[] = [...launchesMock];

  it("should select the launch list", () => {
    const result = selectLaunches.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[0].flight_number).toEqual(1);
  });

  it('should seclect only one launch by ID', ()=>{
    const result = selectLauch(2).projector(initialState);
    expect(result).toEqual(launchesMock[1]);
  });

});
