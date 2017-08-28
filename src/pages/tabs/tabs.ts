import { Component } from '@angular/core';

import { TopPage } from '../top/top';
import { StatsPage } from '../stats/stats';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TopPage;
  tab3Root = StatsPage;

  constructor() {

  }
}
