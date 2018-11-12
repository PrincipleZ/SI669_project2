import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail'
import { Entry } from '../../models/entry'
import { EntryDataServiceProvider } from "../../providers/entry-data-service/entry-data-service"
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private entries: Entry[] = [];
  constructor(public navCtrl: NavController, private entryDataService: EntryDataServiceProvider) {
    
    this.entryDataService.getObservable().subscribe(update=> {
      this.entries = entryDataService.getEntries();
    });
    this.entries = entryDataService.getEntries();
  }



  private addEntry() {
    this.navCtrl.push(EntryDetailPage);
  }


  private editEntry(entryID: number) {
    console.log("editing entry ", entryID);
    this.navCtrl.push(EntryDetailPage, {"entryID": entryID});
  }


  private deleteEntry(entryID: number) {
    this.entryDataService.removeEntry(entryID);
    console.log("deleting entry", entryID);
  }
}

