import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId: any
  currentDate: String
  currentTime: String
  icon:String
  checkedInToday=true
  constructor(public navCtrl: NavController,
    private databaseService: DatabaseServiceProvider,
    private zone: NgZone) {
    databaseService.login().then((userId: String) => {
      this.userId = userId
      databaseService.isNotYetCheckIn(()=>this.checkedInToday=false)
    })
    this.currentDate = moment().format('dddd, DD MMMM YYYY')
    this.updateTime()
    this.icon='pin.jpg'
    
  }
  updateTime() {
    this.currentTime = moment().format('HH:mm:ss')
    setTimeout(()=>this.updateTime(),1000)
  }
  checkIn(target) {
    this.databaseService.checkIn()
    this.checkedInToday=true
    let oldDate=this.currentDate
    let oldIcon=this.icon
    this.currentDate="Success Check In"
    this.icon='check.png'
    setTimeout(()=>{
      this.currentDate=oldDate
      this.icon=oldIcon
    },3000)
  }
}
