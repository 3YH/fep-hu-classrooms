import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule,
} from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSnackBarModule,
        MatTooltipModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTooltipModule,
    ],
})
export class MaterialImportModule { }
