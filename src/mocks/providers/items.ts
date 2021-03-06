import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from '../../models/item';

const STORAGE_KEY = 'CardChain';

@Injectable()
export class Items {

items: Item[] = [];

defaultItem: any = {
  "name": "Tarjeta personalizada",
  "img": "assets/img/marcas/ocr.png",
  "about": "",
  "type": "ocr",
  "color": "red",
  "code": "",
  "format": ""
};

constructor(private storage: Storage) {
  this.storage.get(STORAGE_KEY).then((val) => {
    if(val==null){
    return null;
    } else {
       //this.items.push(val);
       for (let item of val) {
         this.items.push(new Item(item));
       }
    }

  });
}

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
    this.storage.set(STORAGE_KEY,this.items);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.storage.set(STORAGE_KEY,this.items);
  }

}
