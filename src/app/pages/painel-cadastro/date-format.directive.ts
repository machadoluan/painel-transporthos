import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDateFormat]'
})
export class DateFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any): void {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remova todos os caracteres não numéricos
    if (value.length >= 2) {
      value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    }
    input.value = value;
  }
}

