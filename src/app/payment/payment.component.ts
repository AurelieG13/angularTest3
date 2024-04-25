import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PanierService } from '../services/panier.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, TDocumentDefinitions, TDocumentInformation } from 'pdfmake/interfaces';
import { CommandeService } from '../services/commande.service';
import { AuthService } from '../services/auth.service';

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
  commandeId!: any;
  beneficiary: string = '';


  constructor(
    private fb: FormBuilder,
    private panierService: PanierService,
    private commandeService: CommandeService,
    private authService: AuthService
  ) {}

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

  onSubmit() {
    if (this.paymentForm.valid && this.totalPanier !== 0) {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        const commande = {
          beneficiaryName: user.lastname,
          beneficiaryFirstname: user.firstname,
          amount: this.totalPanier,
          paymentType: "Carte bleue"
        };
        this.beneficiary = user.firstname + " " + user.lastname;
        this.commandeService.envoyerCommande(commande).subscribe(
              (response) => {
                this.commandeId = response.id;
                this.generatePDF(this.commandeId);
                console.log("commande envoyée avec succès", response);
              },
              (error) => {
                console.error('Erreur lors de l\'envoi de la commande au backend:', error);
              }
            );
        this.messageCB = true;

      },
      (error) => {
        console.error('Erreur lors de la récupération du user:', error);
      }
    );
  }
  }

  onSubmitCheck(): void {
    if (this.paymentForm.valid && this.totalPanier !== 0) {
      this.authService.getCurrentUser().subscribe(
        (user) => {
          const commande = {
            beneficiaryName: user.lastname,
            beneficiaryFirstname: user.firstname,
            amount: this.totalPanier,
            paymentType: "Chèque"
          };
          this.beneficiary = user.firstname + " " + user.lastname;
          this.commandeService.envoyerCommande(commande).subscribe(
                (response) => {
                  this.commandeId = response.id;
                  this.generatePDFCheck(this.commandeId);
                  console.log("commande envoyée avec succès", response);
                },
                (error) => {
                  console.error('Erreur lors de l\'envoi de la commande au backend:', error);
                }
              );
          this.messageCheque = true;

        },
        (error) => {
          console.error('Erreur lors de la récupération du user:', error);
        }
      );
    }
  }

  onPaymentCheck() {
    this.messageCheque = true;
  }

  onPaymentCb() {
    this.messageCB = true;
  }


  generatePDF(commandeId: any): void {
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
        { text: 'Jeux Olympiques - Paris 2024', style: 'header' },
        { text: 'Numéro de votre commande : '+ commandeId, style: 'subheader'},
        { text: 'Nom Prénom : '+ this.beneficiary, style: 'subheader'},
        { text: 'Montant total payé : ' + this.totalPanier + ' €', style: 'subheader' },
        { text: 'Paiement par Carte Bleue validé ', style: 'classic'},
        { text: 'Détail de la réservation', style: 'header' },
        { table: { body: data } },
        { qr: qrCodeData, fit:150, margin: [30,10,10,10]}

      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [20, 0, 15, 10] },
        subheader: { fontSize: 14, bold: false, margin: [0, 10, 5, 10] },
        classic: { fontSize: 12, bold: false, margin: [0, 10, 5, 10]}
      }
    };

    pdfMake.createPdf(documentDefinition).download('detail_panier.pdf');
  }


  generatePDFCheck(commandeId: any): void {
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
        { text: 'Jeux Olympiques - Paris 2024', style: 'header' },
        { text: 'Numéro de votre commande : '+ commandeId, style: 'subheader'},
        { text: 'Nom Prénom : '+ this.beneficiary, style: 'subheader'},
        { text: 'Montant total restant à payer : ' + this.totalPanier + ' €', style: 'subheader' },
        { text: 'Paiement par chèque à faire ', style: 'classic'},
        { text: 'Détail de la réservation NON VALIDEE', style: 'header' },
        { table: { body: data } },

      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [20, 0, 15, 10] },
        subheader: { fontSize: 14, bold: false, margin: [0, 10, 5, 10] },
        classic: { fontSize: 12, bold: false, margin: [0, 10, 5, 10]}
      }
    };

    pdfMake.createPdf(documentDefinition).download('detail_panier_cheque.pdf');
  }




}
