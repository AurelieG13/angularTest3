import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      beneficiaryName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      checkNumber: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });
    this.paymentFormCb = this.fb.group({
      cbNumber: ['', [Validators.required, Validators.minLength(12)]],
      validityDate: ['', [Validators.required]],
      securityCode: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  onSubmitCheck(): void {
    if (this.paymentForm.valid) {
      // Récupérez les données du formulaire et traitez le paiement par chèque
      const formData = this.paymentForm.value;
      console.log('Payment details cheque:', formData);
      // Ajoutez ici la logique pour traiter le paiement par chèque
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
    this.message = "Votre commande sera traitée après réception de votre chèque";
  }

  onPaymentCb() {
    this.message = "Votre paiement a été effectué, vous recevrez vos billets par mail";
  }
}
