import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { TopPage } from '../pages/top/top';
import { StatsPage } from '../pages/stats/stats';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Firebase } from '@ionic-native/firebase';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyCCgeA76TDmEzaBj8v3Ueg7spbAV0uyCDg",
  authDomain: "earlybird-8f509.firebaseapp.com",
  databaseURL: "https://earlybird-8f509.firebaseio.com",
  projectId: "earlybird-8f509",
  storageBucket: "earlybird-8f509.appspot.com",
  messagingSenderId: "929319360615"
};

@NgModule({
  declarations: [
    MyApp,
    TopPage,
    StatsPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TopPage,
    StatsPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UniqueDeviceID,
    Firebase,
    DatabaseServiceProvider
  ]
})
export class AppModule { }
