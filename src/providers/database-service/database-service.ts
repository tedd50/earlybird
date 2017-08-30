import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {
  userId: String
  constructor(private database: AngularFireDatabase,
    private uniqueDeviceID: UniqueDeviceID,
    private firebase: Firebase,
    private storage: Storage, ) {
    console.log('Hello DatabaseServiceProvider Provider');
  }
  login(): Promise<String> {
    return this.storage.get('userId').then((value: any) => {
      if (value != null) {
        return value
      } else {
        return this.uniqueDeviceID.get()
          .then((uuid: any) => uuid)
          .catch((error: any) => (Date.now().toString()).split('').reverse().join(''))
          .then((generatedId: any) => {
            console.log('generating id: ' + generatedId)
            this.storage.set('userId', generatedId)
            return generatedId
          });
      }
    }).then((userId: String) => {
      this.database.list('/earlybird/' + userId).set('lastLogin', Date.now())
      return this.userId = userId
    })
  }
  checkIn() {
    console.log(this.userId + ' checked in at ' + new Date())
    this.database.list('/earlybird/' + this.userId).push({ timestamp: Date.now() })
  }
}
