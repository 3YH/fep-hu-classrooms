import { FieldPath } from '@angular/fire/firestore';

export interface WhereClause {
    fieldPath: string | FieldPath;
    operator: firebase.firestore.WhereFilterOp;
    value: any;
}
