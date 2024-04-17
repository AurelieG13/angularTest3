import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PanierService } from '../services/panier.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, TDocumentDefinitions, TDocumentInformation } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm!: FormGroup;
  paymentFormCb!: FormGroup;
  message!: string;
  radioValue!: string;
  messageCheque: boolean = false;
  messageCB: boolean = false;
  totalPanier!: number;
  subtotalPanier: {[key: string]: number} = {};

  constructor(private fb: FormBuilder, private panierService: PanierService) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      checkNumber: ['', Validators.required],

    });
    this.paymentFormCb = this.fb.group({
      cbNumber: ['', [Validators.required, Validators.minLength(12)]],
      validityDate: ['', [Validators.required]],
      securityCode: ['', Validators.required],

    });
    this.totalPanier = this.panierService.calculerTotal();
    this.subtotalPanier = this.panierService.calculateSubtotals();
    console.log('subtotal pannier :', this.subtotalPanier);
    console.log('total pannier :', this.totalPanier);
  }

  onSubmitCheck(): void {
    if (this.paymentForm.valid) {
      // Récupérez les données du formulaire et traitez le paiement par chèque
      const formData = this.paymentForm.value;

    }
  }

  onSubmitCb(): void {
    if (this.paymentFormCb.valid) {
      // Récupérez les données du formulaire et traitez le paiement par cb
      const formData = this.paymentFormCb.value;
      console.log('Payment details cb:', formData);
      // Ajoutez ici la logique pour traiter le paiement par cb
    }
  }

  onPaymentCheck() {
    this.messageCheque = true;
  }

  onPaymentCb() {
    this.messageCB = true;
  }


  generatePDF(): void {
    const data = [
      ['Sport', 'Total par sport']
    ];

    for (const key in this.subtotalPanier) {
      if (this.subtotalPanier.hasOwnProperty(key)) {
        data.push([key, this.subtotalPanier[key] + ' €']);
      }
    }

    const qrCodeData = JSON.stringify(this.subtotalPanier);

    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Montant total du panier: ' + this.totalPanier + ' €', style: 'subheader' },
        { text: 'Détail du panier', style: 'header' },
        { table: { body: data } },
        { qr: qrCodeData, fit:150, margin: [0,10,0,0]}

      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] }
      }
    };

    pdfMake.createPdf(documentDefinition).download('detail_panier.pdf');
  }







}
