import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { MdInputModule } from '@angular/material';

@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdSelectModule, MdDialogModule, MdInputModule],
  exports: [MdButtonModule, MdCheckboxModule, MdSelectModule, MdDialogModule, MdInputModule],
})
export class MaterialModule {}
