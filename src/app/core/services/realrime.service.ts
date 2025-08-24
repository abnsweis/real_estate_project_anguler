import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { th } from 'date-fns/locale';
import { Message } from 'primeng/message';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class RealTimeService {

    private hubConnection!: signalR.HubConnection;
    constructor() {

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5193/notification-hub")
            .build();
    }

    startConnection(): Observable<void> {
        return new Observable<void>((obs) => {
            this.hubConnection.start().then(() => {

                console.log('connection has been started');
                obs.next();
                obs.complete();
            })
                .catch(error => {
                    console.log(error);
                })
        });
    }


    receivedMessage(): Observable<string> {
        return new Observable<string>((obs) => {
            this.hubConnection.on('Received', (Message: string) => {
                obs.next(Message)
            })
        })
    }

    sendMessage(message:string){
        this.hubConnection.invoke('send',message)
    }
}
