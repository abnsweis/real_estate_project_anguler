import { Component, OnInit } from '@angular/core';
import { enMode } from '../../../../shared/enums/en-mode';

@Component({
    selector: 'app-add-property',
    standalone: false,
    templateUrl: './add-property.html',
    styleUrl: './add-property.css'
})
export class AddProperty {

    enMode = enMode

}
