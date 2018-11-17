import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntryDetailPage } from '../entry-detail/entry-detail'
import { Entry } from '../../models/entry'
import { EntryDataServiceProvider } from "../../providers/entry-data-service/entry-data-service"
import firebase from 'firebase';

const firebaseConfig = {
      apiKey: "AIzaSyBt6ILh0_d_PQYRzsOhg5Vhy5Nfh11He-4",
      authDomain: "si669project2.firebaseapp.com",
      databaseURL: "https://si669project2.firebaseio.com",
      projectId: "si669project2",
      storageBucket: "",
      messagingSenderId: "797628379770"
    };

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


  private editEntry(entryKey: string) {
    console.log("editing entry ", entryKey);
    this.navCtrl.push(EntryDetailPage, {"entryKey": entryKey});
  }


  private deleteEntry(entryKey: string) {
    this.entryDataService.removeEntry(entryKey);
    console.log("deleting entry", entryKey);
  }
}
