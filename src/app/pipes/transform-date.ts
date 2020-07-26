import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({name: 'transformDate'})

export class TransformDatePipe implements PipeTransform {
    transform(value: NgbDateStruct): string {
        return `${value.day}.${value.month}.${value.year}`;
    }
}