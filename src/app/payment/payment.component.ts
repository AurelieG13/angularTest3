import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PanierService } from '../services/panier.service';

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
      amount: ['', [Validators.required, Validators.min(0.01)]],
      checkNumber: ['', Validators.required],

    });
    this.paymentFormCb = this.fb.group({
      cbNumber: ['', [Validators.required, Validators.minLength(12)]],
      validityDate: ['', [Validators.required]],
      securityCode: ['', Validators.required],

    });
    this.totalPanier = this.panierService.calculerTotal();
    this.subtotalPanier = this.panierService.calculateSubtotals();
  }

  onSubmitCheck(): void {
    if (this.paymentForm.valid) {
      // Récupérez les données du formulaire et traitez le paiement par chèque
      const formData = this.paymentForm.value;

    }
  }

  onSubmitCb(): void {
    if (this.paymentFormCb.valid) {
      // Récupérez les données du formulaire et traitez le paiement par chèque
      const formData = this.paymentFormCb.value;
      console.log('Payment details cb:', formData);
      // Ajoutez ici la logique pour traiter le paiement par chèque
    }
  }

  onPaymentCheck() {
    this.messageCheque = true;
  }

  onPaymentCb() {
    this.messageCB = true;
  }
}
