import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatButtonModule, 
  MatFormFieldModule,
  MatInputModule 
} from '@angular/material';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { DialogComponent } from './chat/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule
  ],
  providers: [MatDialog, {provide: MatDialogRef, useValue: {}}],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
