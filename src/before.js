// import { fromEvent, interval } from "rxjs";
// import { switchMap, filter, map, take } from "rxjs/operators";
// import { ajax } from "rxjs/ajax";

const mapNumbers = document.getElementById("mapNumbers");
const startTimer = document.getElementById("startTimer");
const loadJokes = document.getElementById("loadJokes");
const result = document.getElementById("result");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const jokesUrl =
  "http://api.icndb.com/jokes/random/10/?limitTo=[nerdy]&escape=javascript";

// const numbersClicks$ = fromEvent(mapNumbers, "click");
// numbersClicks$
//   .pipe(
//     take(2),
//     switchMap(e => numbers),
//     filter(n => n % 2 === 0),
//     map(n => ({ n }))
//   )
//   .subscribe(
//     e => console.log(e),
//     err => console.err(err),
//     () => console.log("Completed")
//   );

mapNumbers.addEventListener("click", () => {
  const evenNumbers = numbers.filter(n => n % 2 === 0).map(n => ({ n }));

  result.textContent = JSON.stringify(evenNumbers);
});

// const subscription = fromEvent(startTimer, "click")
//   .pipe(
//     switchMap(() => interval(1000)),
//     filter(n => n % 2 === 0),
//     map(n => ({ n }))
//   )
//   .subscribe(
//     e => console.log(e),
//     err => console.err(err),
//     () => console.log("Completed")
//   );

let handle = null;
startTimer.addEventListener("click", () => {
  if (!handle) {
    let value = -1;
    handle = setInterval(() => {
      value += 1;
      if (value % 2 === 0) {
        result.textContent = JSON.stringify(value);
      }
    }, 1000);
    startTimer.textContent = "Stop timer";
  } else {
    clearInterval(handle);
    handle = null;
    startTimer.textContent = "Start timer";
    subscription.unsubscribe();
  }
});

// fromEvent(loadJokes, "click")
//   .pipe(switchMap(() => ajax.getJSON(jokesUrl)))
//   .subscribe(
//     e => console.log(e),
//     err => console.err(err),
//     () => console.log("Completed")
//   );

loadJokes.addEventListener("click", () => {
  fetch(jokesUrl)
    .then(rsp => rsp.json())
    .then(data => data.value)
    .then(jokes => {
      result.textContent = JSON.stringify(jokes);
    });
});
