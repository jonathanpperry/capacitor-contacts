import { Component } from '@angular/core';

import { Contacts } from '@capacitor-community/contacts';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contacts = <any[]>[];

  constructor(private callNumber: CallNumber, private sms: SMS) {
    this.loadContacts();
  }

  async loadContacts() {
    if (isPlatform('android')) {
      let permission = await Contacts.requestPermissions();
      if (permission.contacts !== 'granted') {
        return;
      }
    }
    Contacts.getContacts({
      projection: {
        // Specify which fields should be retrieved.
        name: true,
        phones: true,
        postalAddresses: true,
      },
    }).then((result) => {
      console.log('contacts result is: ', JSON.stringify(result));
      this.contacts = result.contacts;
    });
  }

  call(contact: any) {
    this.callNumber.callNumber(contact.phones[0].number, true);
  }

  sendSms(contact: any) {
    this.sms.send(contact.phones[0].number, 'Heres a message :)');
  }
}
