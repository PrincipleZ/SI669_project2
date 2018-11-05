import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Entry } from "../../models/entry"
import { EntryDataServiceProvider } from "../../providers/entry-data-service/entry-data-service"


@Component({
  selector: 'page-entry-detail',
  templateUrl: 'entry-detail.html',
})
export class EntryDetailPage {

  private entryText:string;
  private entryTitle:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private entryDataService: EntryDataServiceProvider) {
  }

  private saveEntry(){
    let entry = new Entry();
    entry.title = this.entryTitle;
    entry.text = this.entryText;

    console.log("Now I would save the entry: ", entry);
  }
  
}
