import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CountdownModule } from 'ngx-countdown';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

const MaterialModules = [
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatToolbarModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatTabsModule,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    FlexLayoutModule,
    CountdownModule,
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    FlexLayoutModule,
    CountdownModule,
  ]
})
export class CoreModule { }
