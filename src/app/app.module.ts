import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DrawingCanvasComponent } from './Components/drawing-canvas/drawing-canvas.component';
import { CanvasComponent } from './Components/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawingCanvasComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
