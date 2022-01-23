import React from 'react';
import { PokemonResult } from '@/utils/getPokemonInOrder';
import generateCountPercent from '@/utils/generateCountPercent';
import Image from 'next/image';

interface Props {
  pokemon: PokemonResult;
  rank: number;
}
const PokemonResultsListing = ({ pokemon, rank }: Props) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <Image
            src={pokemon.spriteUrl}
            width={64}
            height={64}
            layout="fixed"
            alt="pokemon sprite"
          />
          <div className="pl-2 capitalize">{pokemon.name}</div>
        </div>
      </div>
      <div className="pr-4">
        {generateCountPercent(pokemon).toFixed(2) + '%'}
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};

export default PokemonResultsListing;
