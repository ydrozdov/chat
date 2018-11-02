import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  usernameFormControl : FormControl = new FormControl('', [Validators.required]);
  username: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { 
  }

  ngOnInit() {
  }
  
}
