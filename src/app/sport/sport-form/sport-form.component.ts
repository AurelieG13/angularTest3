import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SportService } from '../../services/sport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport-form',
  templateUrl: './sport-form.component.html',
  styleUrl: './sport-form.component.css'
})
export class SportFormComponent {

  sport: any = {};
  successMessage!: string;

  constructor(private http: HttpClient, private sportService: SportService, private router: Router,){}

  onSubmit() {
    this.sportService.createSport(this.sport).subscribe(
      (response) => {
        console.log("sport ajouté avec succès");
        this.successMessage = "Le sport a été ajouté avec succès"
        this.resetForm();
        this.router.navigate(['/sportListAdmin']);

      },
      (error) => {
        console.error('Erreur lors de la création : ', error);
      }
    );
  }

  resetForm() {
    // Réinitialiser le formulaire
    this.sport = {}; // Réinitialiser l'objet sport à un nouvel objet vide si nécessaire
    // Effacer le message de succès après un certain délai, par exemple après 5 secondes
    setTimeout(() => {
    this.successMessage = '';
  }, 5000);
  }
}
