
import { Injectable } from '@angular/core';
import { Entry } from '../../models/entry'
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

/*
  Generated class for the EntryDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const firebaseConfig = {
      apiKey: "AIzaSyBt6ILh0_d_PQYRzsOhg5Vhy5Nfh11He-4",
      authDomain: "si669project2.firebaseapp.com",
      databaseURL: "https://si669project2.firebaseio.com",
      projectId: "si669project2",
      storageBucket: "si669project2.appspot.com",
      messagingSenderId: "797628379770"
    };

@Injectable()
export class EntryDataServiceProvider {
  private nextID: number = 0;
  private entries:Entry[] = [];
  private serviceObserver: Observer<Entry[]>;
  private clientObservable: Observable<Entry[]>;
  private db: any;

  constructor(private storage: Storage) {
    // this.loadFakeEntries();
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();

    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });
    let dataRef = this.db.ref('/entries');
    dataRef.on('value', snapshot => {
    this.entries = [];

    snapshot.forEach(childSnapshot => {
      // console.log(childSnapshot.key);
      let entry = {
        key: childSnapshot.key,
        id:childSnapshot.val().id,
        title: childSnapshot.val().title,
        text: childSnapshot.val().text,
        image: childSnapshot.val().image,
        timestamp: childSnapshot.val().timestamp
      };

      this.entries.push(entry);
    });
    this.sortEntry();
    this.notifySubscribers();

  });

    // this.storage.get("myDiaryEntries").then(data => {
    //
    //   if (data != undefined && data != null) {
    //     this.entries = JSON.parse(data);
    //     this.notifySubscribers();
    //   }
    // }, err => {
    //   console.log(err);
    // });
  }

  public getEntries():Entry[] {
    let entriesClone = JSON.parse(JSON.stringify(this.entries));
    return entriesClone;
  }

  public getObservable(): Observable<Entry[]> {
    return this.clientObservable;
  }

  public addEntry(entry:Entry) {
        let listRef = this.db.ref('/entries');
        let prefRef = listRef.push();
        let key =prefRef.getKey();
        console.log(key);


        let dataRecord = {
          key: key,
          id: this.getUniqueID(),
          timestamp:firebase.database.ServerValue.TIMESTAMP,
          title:entry.title,
          text:entry.text,
          image:entry.image,

        }
        prefRef.set(dataRecord);

    // entry.id = this.getUniqueID();
    // entry.timestamp = new Date();
    // this.entries.push(entry);
    // this.sortEntry();
    // this.notifySubscribers();
    // this.saveData();
    // console.log("Added an entry, the list is now: ", this.entries);
  }

  public updateEntry(entryKey:string, newEntry: Entry): void{
    // let entryToUpdate: Entry = this.findEntryByID(id);
    // entryToUpdate.title = newEntry.title;
    // entryToUpdate.text = newEntry.text;
    // entryToUpdate.image = newEntry.image;
    // this.notifySubscribers();
    // this.saveData();

    let parentRef = this.db.ref('/entries');
    console.log("update"+entryKey);
    let childRef = parentRef.child(entryKey);
    childRef.set({key:entryKey,
                  id: newEntry.id,
                  timestamp:newEntry.timestamp,
                  title:newEntry.title,
                  text:newEntry.text,
                  image:newEntry.image
        });
        }

  public removeEntry(entryKey: string): void{

    let parentRef = this.db.ref('/entries');
    let childRef = parentRef.child(entryKey);
    console.log("childkey:"+entryKey);
    console.log("child:"+childRef);
    childRef.remove();
    // for ( let child of childRef){
    //     if (child.id==id){
    //         child.remove();
    //       }
    //     }
    // for (let i = 0; i < this.entries.length; i++) {
    //   let iID = this.entries[i].id;
    //   if (iID === id) {
    //     this.entries.splice(i, 1);
    //     break;
    //   }
    // }
    // this.notifySubscribers();
    // this.saveData();
  }

  private sortEntry(): void {
    this.entries.sort(function(a,b){
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })
  }

  private getUniqueID(): number{
    return this.nextID++;
  }

  private notifySubscribers(): void{
    this.serviceObserver.next(new Array<Entry>());
  }
  // private loadFakeEntries() {
  //   this.entries = [
  //     {
  //       id: this.getUniqueID(),
  //       title: "Latest Entry",
  //       text: "Today I went to my favorite class, SI 669. It was super great."
  //     },
  //     {
  //       id: this.getUniqueID(),
  //       title: "Earlier Entry",
  //       text: "I can't wait for Halloween! I'm going to eat so much candy!!!"
  //     },
  //     {
  //       id: this.getUniqueID(),
  //       title: "First Entry",
  //       text: "OMG Project 1 was the absolute suck!"
  //     }
  //   ];
  // }


  public getEntryByID(id: number): Entry{
    for (let e of this.entries){

      if (e.id === id) {
        let clone = JSON.parse(JSON.stringify(e));
        return clone;
      }
    }
    return undefined;
  }

 public getEntryBykey(entryKey:string): Entry{
   for (let e of this.entries){

     if (e.key === entryKey) {
       let clone = JSON.parse(JSON.stringify(e));
       return clone;
     }
   }
   return undefined;
 }


  private findEntryByID(id: number): Entry {
    for (let e of this.entries) {
      if (e.id === id) {
         return e;
      }
    }
    return undefined;
  }

  private saveData(): void {
    let key = "myDiaryEntries";
    this.storage.set(key, JSON.stringify(this.entries));
  }
}
