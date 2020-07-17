import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() label = 'Select';
  @Input() options: string[] = [];
  @Output() handleSelection = new EventEmitter();
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.options.currentValue.length || changes.options.currentValue !== changes.options.previousValue) {
      this.myControl.patchValue('');
    }
  }

  onOptionSelect(e) {
    this.handleSelection.emit(e.source.value);
  }

  displayFn(user?: string): string | undefined {
    return user ? user : undefined;
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
