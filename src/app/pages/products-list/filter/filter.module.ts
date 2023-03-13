import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [FilterComponent],
	imports: [CommonModule, MatInputModule, MatCheckboxModule, MatProgressSpinnerModule],
	exports: [FilterComponent],
})
export class FilterModule {}
