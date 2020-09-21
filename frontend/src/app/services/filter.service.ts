import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable()
export class FilterService {
    private filter$ = new Subject();

    getData() {
        return this.filter$;
    }

    updateData(data: boolean) {
        this.filter$.next(data);
    }
}