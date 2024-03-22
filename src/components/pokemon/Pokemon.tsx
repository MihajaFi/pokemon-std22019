"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const LIMIT = 50;
const OFFSET = 0;

export function Pokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await axios.get<PokemonPage>(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${
          OFFSET + (currentPage - 1) * LIMIT
        }`
      );
      setPokemons(response.data.results);
      setTotalPages(Math.ceil(response.data.count / LIMIT));
    }
    fetchPokemons();
  }, [currentPage]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.url}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.url.split("/")[6]
              }.png`}
              alt={pokemon.name}
            />
          </figure>
          <div className="card-body">
            <h1>{pokemon.name}</h1>

            <p>
              The place isclose to Barceloneta Beach and bus stop just 2 min by
              walk and near to &quot;Naviglio&quot; where you can enjoy the main
              night life in Barcelona.
            </p>
            <div className="card-actions justify-end">
              <Link href={`/details/${pokemon.url.split("/")[6]}`}>
                <button>Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
