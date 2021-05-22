import { Component, HostListener, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ItemsService} from '../services/items.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public fetchedItems = [];

  // items displayed on DOM
  public items: Array<any> = [];

  // number of items loaded
  public itemsCount = 0;

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    let currentPosition = document.getElementById('grid').scrollTop + document.getElementById('grid').offsetHeight;
    let containerHeight = document.getElementById('grid').scrollHeight;
    if (currentPosition + 200 >= containerHeight && this.itemsCount < this.fetchedItems.length) {
      this.addFruits();
    }
  }

  constructor(
    private itemService: ItemsService
  ) {}

  ngOnInit() {
    // retrieve fruits
    this.itemService.getFruits()
      .subscribe(
        (response) => {
          this.fetchedItems = response;
          // double amount of fruits to see more scrolling
          this.fetchedItems = this.fetchedItems.concat(this.fetchedItems);
          console.log(this.fetchedItems)
          // load initial fruits
          this.addFruits();
        },
        (error) => {
          console.log(error);
        }
      )
  }

  private addFruits(): void {
    if (this.itemsCount != 0) {
      document.getElementById('loading-container').style.display = 'flex';
      setTimeout(async() => {document.getElementById('loading-container').style.display = 'none';}, 750);
    }
    // determine number of fruits to add
    // if adding 5 would be more than we have, get the difference
    if (this.itemsCount+6 > this.fetchedItems.length) {
      const difference = this.fetchedItems.length - this.itemsCount;
      this.itemsCount += difference;
    } else {
      this.itemsCount += 6; // else add 5 fruits
    }
    // add the fruits
    this.items = (this.fetchedItems.slice(0, this.itemsCount));
  }

}
