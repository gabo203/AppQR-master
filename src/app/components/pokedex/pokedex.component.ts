import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokemonList: any[] = [];
  selectedPokemon: any = null;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.pokedexService.getPokemonList().subscribe(data => {
      this.pokemonList = data.results;
    });
  }

  loadPokemonDetails(name: string) {
    this.pokedexService.getPokemonDetails(name).subscribe(data => {
      this.selectedPokemon = data;
    });
  }
}