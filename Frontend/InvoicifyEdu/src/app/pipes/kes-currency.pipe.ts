import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'kesCurrency',
  standalone: true
})
export class KesCurrencyPipe extends CurrencyPipe implements PipeTransform {

  // @ts-ignore
  override transform: (value: (number | string | null | undefined), currencyCode?: string, display?: ("code" | "symbol" | "symbol-narrow" | string | boolean), digitsInfo?: string, locale?: string) => (string | null) = (
    value: number | string | null | undefined,
    currencyCode: string = 'KES',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo?: string,
    locale: string = 'en-KE'
  ): string | null => {
    const transformedValue = super.transform(value, currencyCode, display, digitsInfo, locale);

    // Add a space between the currency symbol and the amount
    return transformedValue ? transformedValue.replace('KES', 'KES ') : null;
  };
}
