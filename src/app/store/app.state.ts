import { Launch } from '../models/launch.model';

export interface AppState {
  launches: ReadonlyArray<Launch>;
}
