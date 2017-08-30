import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId: any
  currentDate:String
  currentTime:String
  constructor(public navCtrl: NavController,
    private databaseService: DatabaseServiceProvider) {
      databaseService.login().then((userId:String)=>this.userId=userId)
      this.currentDate=moment().format('dddd, DD MMMM YYYY')
      this.currentTime=moment().format('h:mm:ss a')
  }
  checkIn() {
    this.databaseService.checkIn()
  }
}
