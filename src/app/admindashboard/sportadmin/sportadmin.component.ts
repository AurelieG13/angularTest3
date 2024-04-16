import { Component } from '@angular/core';
import { Sport } from '../../model/sport.model';
import { SportService } from '../../services/sport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sportadmin',
  templateUrl: './sportadmin.component.html',
  styleUrl: './sportadmin.component.css'
})
export class SportadminComponent {

  sports: Sport[] = [];

  constructor(private sportService: SportService, private router: Router) {}
  editingSportIndex: number = -1;

  ngOnInit(): void {
    this.sportService.getSports().subscribe(
      (sports: Sport[]) => {
        this.sports = sports;
        console.log(this.sports);
      },
      error => {
        console.error('Erreur current user', error);
      }
    );
  }

  toggleEditing(index: number): void {
    this.editingSportIndex = index === this.editingSportIndex ? -1 : index;
  }

  isEditing(index: number): boolean {
    return index === this.editingSportIndex;
  }

  updateSportAdmin(sport: Sport): void {
    // Mettre à jour l'utilisateur dans la base de données
    this.sportService.updateSportAdmin(sport).subscribe(
      updatedSport => {

        // Mettre à jour l'utilisateur dans la liste des sports
        const index = this.sports.findIndex(u => u.id === updatedSport.id);
        if (index !== -1) {
          this.sports[index] = updatedSport;
        }
        // Désactiver le mode d'édition
        this.editingSportIndex = -1;

      },
      error => {
        console.error('Erreur lors de la mise à jour du sport', error);
      }
    );
  }

  createSport(sport: Sport) {
    this.sportService.createSport(sport).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/sportListAdmin']);

      },
      error => {
        console.error("erreur sur appel api", error);

      }
    );
  }

  deleteOneSport(id: number): void {
    this.sportService.deleteOneSport(id).subscribe(
      () => {
        const index = this.sports.findIndex(sport => sport.id === id);
        if (index !== -1) {
          // Retirez le sport du tableau
          this.sports.splice(index, 1);
          console.log('Sport supprimé avec succès');
        } else {
          console.error('Sport non trouvé dans la liste');
        }
      },
      error => {
        console.error("erreur à la suppression", error);

      }
    );
  }



}
