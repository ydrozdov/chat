import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { share } from "rxjs/operators";
import { environment } from '../../environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private client;
  websocketObservable: Observable<any>;
  archiveTopicObservable: Observable<any>;
  messageTopicObservable: Observable<any>;

  constructor() { 
    this.websocketObservable = Observable.create(websocketSubscriber => {
      let socket = new SockJS(environment.websocket);
      this.client = Stomp.over(socket);

      this.client.connect({}, (frame) => {
        this.archiveTopicObservable = Observable.create(responseSubscriber => {
          let subscription = this.client.subscribe('/topic/archive', (message) => {
            subscription.unsubscribe();
            responseSubscriber.next(JSON.parse(message.body));
          }); 
          return () => {
            subscription.unsubscribe();
          };
         }).pipe(share());


         this.messageTopicObservable = Observable.create(responseSubscriber => {
          let subscription = this.client.subscribe('/topic/public', (message) => {
            responseSubscriber.next(JSON.parse(message.body));
          });
          return () => {
            subscription.unsubscribe();
          };
         }).pipe(share()); 
  
        websocketSubscriber.next({});
      });
  
  
      return () => {
        this.client.disconnect();
      }
    }).pipe(share());

  }

  public requestMessages() {
    this.client.send("/app/getall",{});
  }

  public sendMessage(message) {
    this.client.send("/app/send",{}, JSON.stringify(message));
  }
}
