"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Button,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
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
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${OFFSET + (currentPage - 1) * LIMIT}`
      );
      setPokemons(response.data.results);
      setTotalPages(Math.ceil(response.data.count / LIMIT));
    }
    fetchPokemons();
  }, [currentPage]);

  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        {pokemons.map((pokemon) => (
          <ListItem key={pokemon.url}>
            <ListItemPrefix>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.name}
                className="h-10 w-10"
              />
            </ListItemPrefix>
            <Link href={`/pokemon/${pokemon.name}`} passHref>
              <Typography
                variant="h6"
                color="blue-gray"
                className="cursor-pointer font-medium"
              >
                {pokemon.name}
              </Typography>
            </Link>
            <ListItemSuffix>
              <Button variant="text" color="blue-gray" size="sm" className="flex items-center gap-1">
                <PencilIcon className="h-4 w-4" />
                Détails
              </Button>
            </ListItemSuffix>
          </ListItem>
        ))}
      </List>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant="text"
            color="blue-gray"
            size="sm"
            className={`${page === currentPage ? "font-bold" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>
    </Card>
  );
}