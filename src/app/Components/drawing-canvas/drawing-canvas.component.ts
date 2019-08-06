import { Component, OnInit } from "@angular/core";
import { Observable, throwError , fromEvent} from 'rxjs';

@Component({
  selector: "app-drawing-canvas",
  templateUrl: "./drawing-canvas.component.html",
  styleUrls: ["./drawing-canvas.component.scss"]
})
export class DrawingCanvasComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const move$ = fromEvent(document, "mousemove");
    const log = x => console.log(x);
    move$.subscribe(log);
  }
}
