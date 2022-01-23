import PokemonResultsListing from '@/components/PokemonResultsListing';
import generateCountPercent from '@/utils/generateCountPercent';
import getPokemonInOrder from '@/utils/getPokemonInOrder';
import { PokemonQueryResult } from '@/utils/getPokemonInOrder';
import Head from 'next/head';

interface Props {
  pokemons: PokemonQueryResult;
}
const ResultsPage: React.FC<Props> = ({ pokemons }) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Roundest Pokemon Results</title>
      </Head>
      <h2 className="text-2xl p-4">Results</h2>
      <div className="flex flex-col w-full max-w-2xl border">
        {pokemons
          ?.sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);
            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentPokemon, index) => {
            return (
              <PokemonResultsListing
                pokemon={currentPokemon}
                key={index}
                rank={index + 1}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps = async () => {
  const pokemonOrdered = await getPokemonInOrder();
  const DAY_IN_SECONDS = 60 * 60 * 24;
  return { props: { pokemon: pokemonOrdered }, revalidate: DAY_IN_SECONDS };
};
