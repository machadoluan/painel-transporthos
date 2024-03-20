import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef

  constructor() { }

  ngOnInit(): void {

  }

  baixarpdf() {
    console.log("aqui")

    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4'
    })

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('clinte.pdf')
      }
    })
  }





}
