import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

class Message {
  type: AlertType;
  message: string;
  alertId: string;
  keepAfterRouteChange: boolean;

  constructor (init?: Partial<Message>) {
    Object.assign(this, init)
  }
}

enum AlertType {
  Success,
  Warning,
  Error,
  Info
}



@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Message>()
  private keepAfterRouteChange = false;

  private messages: Observable<Message[]>;
  constructor(private toastrService: NbToastrService, private router: Router) {
    this.router.events.subscribe(event => {
        if(event instanceof NavigationStart) {
          if(this.keepAfterRouteChange) {
            this.keepAfterRouteChange = false;
          } else {
            this.clear()
          }
        }
      })
    }


    onAlert(alertId: String): Observable<Message> {
      return this.subject.asObservable()
    }

    success(message: string, alertId?: string) {
      this.alert(new Message({ message, type: AlertType.Success, alertId }))
    }

    error(message: string, alertId?: string) {
      this.alert(new Message({ message, type: AlertType.Error, alertId }))
    }

    info(message: string, alertId?: string) {
      this.alert(new Message({ message, type: AlertType.Info, alertId }))
    }

    warn(message: string, alertId?: string) {
      this.alert(new Message({ message, type: AlertType.Warning, alertId }))
    }

    alert(alert: Message) {
      this.keepAfterRouteChange = alert.keepAfterRouteChange;
      this.subject.next(alert)
    }



    clear(alertId?: string) {
      this.subject.next(new Message({ alertId }))
    }
}
