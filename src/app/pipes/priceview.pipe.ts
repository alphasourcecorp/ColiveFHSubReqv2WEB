import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceview'
})
export class PriceviewPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    let processedPriceString = "";
    let customString = args[0] || "TBD";

    if (value <= 0 || value === undefined || value === null) {
      processedPriceString = customString
    }
    else {
      processedPriceString = `₹ ${value.toString()}`;
    }

    return processedPriceString;
  }

}
