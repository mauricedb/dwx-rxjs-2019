import { fromEvent } from "rxjs";
import { switchMap, map, pairwise, takeUntil } from "rxjs/operators";

const canvas = document.getElementById("canvas");

const mouseDown$ = fromEvent(canvas, "mousedown");
const mouseMove$ = fromEvent(canvas, "mousemove");
const mouseUp$ = fromEvent(canvas, "mouseup");

mouseDown$
  .pipe(
    switchMap(() =>
      mouseMove$.pipe(
        map(e => ({
          ctx: e.target.getContext("2d"),
          x: e.offsetX,
          y: e.offsetY
        })),
        pairwise(),
        takeUntil(mouseUp$)
      )
    )
  )
  .subscribe(pair => {
    const [from, to] = pair;
    const ctx = from.ctx;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  });
