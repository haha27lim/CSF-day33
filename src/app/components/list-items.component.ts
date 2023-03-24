import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from '../models';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnChanges {

  // An array of Item objects received as an Input from the parent component
  @Input()
  items = [] as Item[]

  // @Input()
  // get items(): Item[] {
  //   return this._items
  // }
  // set items(i: Item[]) {
  //   this._items = i
  //   this.itemCount = 0;
  //   for (let a of this._items)
  //     this.itemCount += a.quantity
  // }
  // private _items: Item[] = []

  // A Subject that emits the index of the selected item when an item is clicked
  @Output()
  onSelection = new Subject<number>()

  // Total count of all items in the list
  itemCount = 0

  // A lifecycle hook that gets called whenever an Input property changes
  ngOnChanges(changes: SimpleChanges) {
    // Debugging line to print the changes object in the console
    console.info('>>> simple changes: ', changes)
    // Get the current value of the 'items' Input property from the changes object
    let its: Item[] = changes['items'].currentValue
    // Reset the itemCount to 0
    this.itemCount = 0
    // Loop through each item in the 'its' array
    for (let i of its)
      this.itemCount += i.quantity // Add the quantity of each item to the itemCount
  }

  // A method that gets called when an item is clicked
  selected(idx: number) {
    console.info('selected: ', idx) // Debugging line to print the index of the selected item in the console
    // Emit the index of the selected item through the onSelection Subject
    this.onSelection.next(idx)
  }
}
