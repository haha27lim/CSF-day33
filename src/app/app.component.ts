import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Item } from './models';
import { AddItemComponent } from './components/add-item.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  // refers to the AddItemComponent instance in the template
  @ViewChild(AddItemComponent)
  addItemComp!: AddItemComponent

  // refers to the button element with id 'modifyButton'
  @ViewChild('modifyButton')
  modifyBtnRef!: ElementRef

  // array to store the items
  items: Item[] = []

  // stores the currently selected item, initialized to null
  selectedItem: Item | null = null

  ngOnInit(): void {
    console.info('>>> addItemComp: ', this.addItemComp)
  }

  ngAfterViewInit(): void {
    console.info('>>> after view init addItemComp: ', this.addItemComp)
    console.info('>>> after view init addItemComp: ', this.modifyBtnRef)
    // sets the text of the button with id 'modifyButton' to 'I have modified the button'
    this.modifyBtnRef.nativeElement.innerText = 'I have modified the button'
  }

  newItem(item: Item) {
    console.info('items: ', item)
    // adds the new item to the items array
    this.items = [...this.items, item ]
    //this.items.push(item)
  }

  itemSelected(idx: number) {
    // sets the selectedItem to the item at the specified index
    this.selectedItem = this.items[idx]
  }

  modifyItem() {
    // logs the value of the item entered in the AddItemComponent
    console.info('>>> modify item clicked', this.addItemComp.value)
    // adds the item entered in the AddItemComponent to the items array
    this.newItem(this.addItemComp.value)
  }
}