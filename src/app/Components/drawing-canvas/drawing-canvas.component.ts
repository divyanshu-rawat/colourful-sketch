import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Observable, throwError, fromEvent } from "rxjs";
import {
  skipUntil,
  takeUntil,
  repeat,
  mergeMap,
  switchMap,
  pairwise
} from "rxjs/operators";

@Component({
  selector: "app-drawing-canvas",
  templateUrl: "./drawing-canvas.component.html",
  styleUrls: ["./drawing-canvas.component.css"]
})
export class DrawingCanvasComponent implements OnInit {
  @ViewChild("myCanvas", { static: false }) public myCanvas: any;
  public context: CanvasRenderingContext2D;
  private ctx;
  private colorHue = 0;

  constructor() {}
  ngOnInit() {}

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvasEl.getContext("2d");
    canvasEl.width = window.innerWidth - 20;
    canvasEl.height = window.innerHeight - 20;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 70;
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, "mousedown")
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, "mousemove").pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, "mouseup")),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, "mouseleave")),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    // incase the context is not set
    if (!this.ctx) {
      return;
    }

    this.ctx.strokeStyle = `hsl(${this.colorHue}, 100%, 60%)`;
    // start our drawing path
    this.ctx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.ctx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.ctx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.ctx.stroke();
    }
    this.colorHue++;
  }
}
