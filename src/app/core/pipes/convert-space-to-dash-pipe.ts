import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSpaceToDash'
})
export class ConvertSpaceToDashPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replaceAll(' ', '-');
  }

}
