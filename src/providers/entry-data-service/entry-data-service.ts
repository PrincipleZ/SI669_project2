
import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry'

/*
  Generated class for the EntryDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntryDataServiceProvider {

  
  private entries:Entry[] = [];
  
  constructor() {
    this.loadFakeEntries();
  }
  
  public getEntries():Entry[] {  
    let entriesClone = JSON.parse(JSON.stringify(this.entries));
    return entriesClone;
  }


private loadFakeEntries() {
    this.entries = [
      {
        title: "Latest Entry",
        text: "Today I went to my favorite class, SI 669. It was super great."
      },
      {
        title: "Earlier Entry",
        text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
      },
      {
        title: "First Entry",
        text: "OMG Project 1 was the absolute suck!"
      }
    ];
  }
}
