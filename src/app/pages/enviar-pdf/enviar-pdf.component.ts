import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { GerarPdfService } from 'src/app/services/gerar-pdf.service';

@Component({
  selector: 'app-enviar-pdf',
  templateUrl: './enviar-pdf.component.html',
  styleUrls: ['./enviar-pdf.component.css']
})
export class EnviarPdfComponent {
  formulario: FormGroup;


  constructor(private formBuilder: FormBuilder, private enviarPdfService: GerarPdfService) {
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      status: ['', Validators.required],
      imagem: [''], // A imagem será preenchida posteriormente pelo usuário
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarPDF() {
    if (this.formulario.valid) {
      this.enviarPdfService.enviarPDF(this.formulario.value).subscribe(
        (resposta) => {
          console.log('PDF enviado com sucesso:', resposta);
          // Limpe o formulário após o envio bem-sucedido, se necessário
          this.formulario.reset();
        },
        (error) => {
          console.error('Erro ao enviar PDF:', error);
        }
      );
    } else {
      console.error('Formulário inválido');
    }
  }



}
