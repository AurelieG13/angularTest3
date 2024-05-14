import { Component, OnInit } from '@angular/core';
import { Commande } from '../../model/commande.model';
import { CommandeService } from '../../services/commande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-admin',
  templateUrl: './commande-admin.component.html',
  styleUrl: './commande-admin.component.css'
})
export class CommandeAdminComponent implements OnInit{

  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService, private router: Router) {}
  editingCommandeIndex: number = -1;

  ngOnInit(): void {
    this.commandeService.getCommande().subscribe(
      (commandes: Commande[]) => {
        this.commandes = commandes;
      },
      error => {
        console.error('Erreur current command', error);
      }
    );
  }

  deleteOneCommande(id: number): void {
    this.commandeService.deleteOneCommande(id).subscribe(
      () => {
        const index = this.commandes.findIndex(commande => commande.id === id);
        if (index !== -1) {
          // Retirez le sport du tableau
          this.commandes.splice(index, 1);
        } else {
          console.error('commande non trouvé dans la liste');
        }
      },
      error => {
        console.error("erreur à la suppression", error);

      }
    );
  }

}
