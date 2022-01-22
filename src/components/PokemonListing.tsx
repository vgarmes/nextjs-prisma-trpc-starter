import { inferQueryResponse } from '../pages/api/trpc/[trpc]';
import Image from 'next/image';

type PokemonFromServer = inferQueryResponse<'get-pokemon-pair'>['firstPokemon'];

interface PokemonListingProps {
  pokemon: PokemonFromServer;
  vote: () => void;
  disabled: boolean;
}
const PokemonListing: React.FC<PokemonListingProps> = ({
  pokemon,
  vote,
  disabled,
}) => {
  return (
    <div
      className={`flex flex-col items-center transition-opacity ${
        disabled && 'opacity-0'
      }`}
      key={pokemon.id}
    >
      <div className="text-xl text-center capitalize mt-[-0.5rem]">
        {pokemon.name}
      </div>
      <Image
        src={pokemon.spriteUrl}
        width={256}
        height={256}
        layout="fixed"
        className="animate-fade-in"
        alt="pokemon sprite"
      />
      <button
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => vote()}
        disabled={disabled}
      >
        Rounder
      </button>
    </div>
  );
};

export default PokemonListing;
