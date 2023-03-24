import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from '../models';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnChanges {

  // Initializing form group
  form!: FormGroup

  // Initializing output subject
  @Output()
  onNewItem = new Subject<Item>()

  // Initializing input item value
  @Input()
  item: Item | null = null

  // Getter to return form's value and to check if form is invalid
  get value(): Item {
    return this.form.value as Item
  }

  get invalid(): boolean {
    return this.form.invalid
  }

  // Constructor injecting FormBuilder
  constructor(private fb: FormBuilder) { }

  // ngOnChanges lifecycle hook that listens for changes to input item value
  ngOnChanges(changes: SimpleChanges): void {
    console.info('changes: ', changes)

    // Get the current item value from the changes object
    const i: Item = changes['item'].currentValue

    // Get the item and quantity form controls
    const itemCtrl = this.form.get('item') as FormControl
    const quantityCtrl = this.form.get('quantity') as FormControl

    // Set the form control values to the new item value
    itemCtrl.setValue(i.item)
    quantityCtrl.setValue(i.quantity)
  }

  // ngOnInit lifecycle hook that initializes the form group
  ngOnInit(): void {
    // Create form group with item and quantity form controls
    this.form = this.fb.group({
      item: this.fb.control<string>('', [ Validators.required, Validators.minLength(2) ]),
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

  // Function that processes the form when submitted
  processForm() {
    // Get the item form control value
    const itemCtrl = this.form.get('item') as FormControl
    const item0 = itemCtrl.value

    // Get the form value as an item object
    const value: Item = this.form.value

    // Reset the form
    this.form.reset()

    // Emit the new item object using the output subject
    this.onNewItem.next(value)

    // Print the item control value and form value to the console
    console.info(`item0 = ${item0}`)
    console.info('item1 = ', value)
  }
}
