import { Component } from "@angular/core";

import { Contact } from "@capacitor-community/contacts";

import { Plugins } from "@capacitor/core";
const { Contacts } = Plugins;

import { CallNumber } from "@ionic-native/call-number/ngx";
import { SMS } from "@ionic-native/sms/ngx";
import { isPlatform } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  contacts = [];
  constructor(private callNumber: CallNumber, private sms: SMS) {
    this.loadContacts();
  }

  async loadContacts() {
    if (isPlatform("android")) {
      let permission = await Contacts.getPermissions();
      if (!permission.granted) {
        return;
      }
    }
    Contacts.getContacts().then((result) => {
      this.contacts = result.contacts;
    });
  }

  call(contact: Contact) {
    this.callNumber.callNumber(contact.phoneNumbers[0], true);
  }

  sendSms(contact: Contact) {
    this.sms.send(contact.phoneNumbers[0], "This is my pred");
  }
}
