import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef} from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatList, MatListItem} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageService} from '../services/message.service';
import {Message} from '../models/message';
import {Messagedto} from '../models/messagedto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username: string;
  dialogRef: MatDialogRef<DialogComponent>;
  messages: Message[] = [];
  messageContent: string;
  messageDTO: Messagedto = new Messagedto();

  constructor(private dialog: MatDialog,
    private messageService: MessageService
    ) { 
  }

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  ngOnInit() {
    setTimeout(() => this.openUserPopup());
  }

  public sendMessage(): void {
    this.messageDTO.sender = this.username;
    this.messageDTO.content = this.messageContent;
    this.messageService.sendMessage(this.messageDTO);
  }

  private openUserPopup(): void {
    this.dialogRef = this.dialog.open(DialogComponent, {});
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.username = paramsDialog;

      this.messageService.websocketObservable.subscribe((result) => {
        let mySubscription = this.messageService.archiveTopicObservable.subscribe((myWebSocketResponse) => {
          this.messages = myWebSocketResponse;
        });

        this.messageService.requestMessages();
      });

      this.messageService.websocketObservable.subscribe((result) => {
        let mySubscription = this.messageService.messageTopicObservable.subscribe((myWebSocketResponse) => {
          this.messages.push(myWebSocketResponse);
        })
      });

    });
  }
  
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
