import { fromEvent, interval, from } from "rxjs";
import { switchMap, filter, map, scan } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const mapNumbers = document.getElementById("mapNumbers");
const startTimer = document.getElementById("startTimer");
const loadJokes = document.getElementById("loadJokes");
const result = document.getElementById("result");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const jokesUrl =
  "http://api.icndb.com/jokes/random/10/?limitTo=[nerdy]&escape=javascript";

const numbersClicks$ = fromEvent(mapNumbers, "click");
numbersClicks$
  .pipe(
    switchMap(() => from(numbers)),
    filter(n => n % 2 === 0),
    map(n => ({ n })),
    scan((previous, current) => [...previous, current], [])
  )
  .subscribe(evenNumbers => (result.textContent = JSON.stringify(evenNumbers)));

fromEvent(startTimer, "click")
  .pipe(
    switchMap(() => interval(1000)),
    filter(n => n % 2 === 0),
    map(n => ({ n })),
    scan((previous, current) => [...previous, current], [])
  )
  .subscribe(value => (result.textContent = JSON.stringify(value)));

fromEvent(loadJokes, "click")
  .pipe(
    switchMap(() => ajax.getJSON(jokesUrl)),
    map(rsp => rsp.value)
  )
  .subscribe(value => (result.textContent = JSON.stringify(value)));
