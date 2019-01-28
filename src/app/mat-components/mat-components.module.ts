import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDividerModule,
  MatSortModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatSortModule,
    MatIconModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatSortModule,
    MatIconModule
  ]
})
export class MatComponentsModule {}
