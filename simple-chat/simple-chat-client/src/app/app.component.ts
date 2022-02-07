import { Component, NgZone } from '@angular/core';
import { Message } from './models/message';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-chat';

  txtMessage: string = '';

  uniqueID: string = new Date().getTime().toString();

  messages = new Array<Message>();

  message = new Message();

  constructor(
    private chatService: ChatService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  // @ts-ignore
  public inputed(event) {
    this.txtMessage=event.target.value;
  }

  public sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientId = this.uniqueID;
      this.message.type = "sent";
      this.message.content = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientId !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });
  }
}
