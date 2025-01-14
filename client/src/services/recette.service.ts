import { Injectable } from '@angular/core';

interface Recette {
  userId: string;
  nom: string;
  ingredient: string;
  recette_detail: string;
  nmbrDePersonne: number;
  tempsDePreparation: string;
  difficulte: string;
  type: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  private apiUrl = 'http://localhost:8088';

  getRecettes(userId: string) {
    return fetch(`${this.apiUrl}/api/recipes?userId=${userId}`)
      .then(response => response.json());
  }

  constructor() { }
}
