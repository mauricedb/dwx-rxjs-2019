import { from, fromEvent, interval } from 'rxjs';
import { filter, map, scan, switchMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const mapNumbers = document.getElementById('mapNumbers');
const startTimer = document.getElementById('startTimer');
const loadJokes = document.getElementById('loadJokes');
const result = document.getElementById('result');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const jokesUrl =
  'http://api.icndb.com/jokes/random/10/?limitTo=[nerdy]&escape=javascript';

const numbersClicks$ = fromEvent(mapNumbers, 'click');

numbersClicks$
  .pipe(
    switchMap(() =>
      from(numbers).pipe(
        filter(n => n % 2 === 0),
        map(n => ({ n })),
        scan((previous, current) => [...previous, current], [])
      )
    )
  )
  .subscribe(value => (result.textContent = JSON.stringify(value)));

fromEvent(startTimer, 'click')
  .pipe(
    switchMap(() =>
      interval(1000).pipe(
        filter(n => n % 2 === 0),
        map(n => ({ n })),
        scan((previous, current) => [...previous, current], [])
      )
    )
  )
  .subscribe(value => (result.textContent = JSON.stringify(value)));

fromEvent(loadJokes, 'click')
  .pipe(
    take(3),
    switchMap(() => ajax.getJSON(jokesUrl)),
    map(rsp => rsp.value)
  )
  .subscribe({
    next: value => (result.textContent = JSON.stringify(value)),
    error: err => (result.textContent = err.message),
    complete: () => (result.textContent = result.textContent)
  });
