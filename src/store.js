import { fromEvent, Subject } from "rxjs";
import { startWith, scan, shareReplay } from "rxjs/operators";

import reducer from "./reducer";

const initialState = {
  count: 0,
  firstName: "Maurice"
};

const action$ = new Subject();
const store$ = action$.pipe(
  startWith({ type: "__INIT__" }),
  scan(reducer, initialState),
  shareReplay(1)
);

const dispatch = action => action$.next(action);

//

fromEvent(start, "click").subscribe(() => dispatch({ type: "INCREMENT" }));

store$.subscribe(state => console.log("State:", state));
