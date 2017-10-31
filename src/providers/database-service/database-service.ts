import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Storage } from '@ionic/storage';
import moment from 'moment';
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
  isNotYetCheckIn(todo){
   this.database.list('/earlybird/' + this.userId+'/check-in', 
    ref=>ref.limitToLast(1)).query.once('value',v=>{
      let vjson=v.toJSON()
      if(vjson!=null){
      let item=(<any>Object).values(vjson)[0]
      console.log('last timestamp: '+item)
      if(!moment(item).isAfter(moment().startOf('day')))
        todo()
      }else todo()
    })
  }
  checkIn() {
    console.log(this.userId + ' checked in at ' + new Date())
    this.database.list('/earlybird/' + this.userId+'/check-in').push(Date.now())
  }
}
