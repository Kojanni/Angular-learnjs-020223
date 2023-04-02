import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { IProductsFilter } from './products-filter.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
	@Input() brands!: string[] | null;

	@Output() changeFilter = new EventEmitter<IProductsFilter>();

	// readonly filterForm = new FormGroup({
	// 	name: new FormControl('', {validators: [Validators.minLength(3)]}),
	// 	brands: new FormArray([]),
	// 	priceRange: new FormGroup({
	// 		min: new FormControl(-1),
	// 		max: new FormControl(0),
	// 	})
	// });

	readonly filterForm = this.formBuilder.group({
		name: ['', { validators: [Validators.minLength(3)] }],
		brands: this.formBuilder.array<boolean>([]),
		priceRange: this.formBuilder.group({
			min: -1,
			max: 0,
		}),
	});

	constructor(
		private readonly formBuilder: FormBuilder,
		private router: Router, // private readonly formGroupName: FormGroupName,
	) {
		// this.formGroupName.control

		this.filterForm.valueChanges.subscribe(formValue => {
			const { brands, ...otherValues } = formValue;

			// console.log({
			// 	...otherValues,
			// 	brands: this.getPrandsList(brands as boolean[]),
			// })

			// this.changeFilter.emit()
		});

		// this.filterForm.get('name')?.valueChanges.subscribe(console.log);
	}

	get nameControl(): FormControl {
		return this.filterForm.get('name') as FormControl;
	}

	ngOnChanges({ brands }: SimpleChanges): void {
		if (brands) {
			const brandsControls = this.brands ? this.brands.map(() => this.formBuilder.control(false)) : [];
			const newBrandsFormArray = this.formBuilder.array(brandsControls);

			this.filterForm.setControl('brands', newBrandsFormArray);
		}
	}

	appendAQueryParam(paramKey: string, paramValue: string) {
		const urlTree = this.router.createUrlTree([], {
			queryParams: { paramKey: paramValue },
			queryParamsHandling: 'merge',
			preserveFragment: true,
		});

		this.router.navigateByUrl(urlTree);
	}

	onSubmit(formValue: unknown) {
		// console.log(formValue);
	}

	private getBrandsList(brandsActiveFlags: boolean[]): IProductsFilter['brands'] {
		if (!this.brands) {
			return [];
		}

		return this.brands.filter((_, index) => brandsActiveFlags[index]);
	}
}
