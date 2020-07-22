import { Pipe, PipeTransform } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Pipe({name: 'reformatDate'})

export class ReformatDatePipe implements PipeTransform {
    transform(value: NgbDateStruct): string {
        return `${value.day}.${value.month}.${value.year}`;
    }
}