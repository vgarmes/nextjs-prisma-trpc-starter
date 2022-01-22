import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import PokemonListing from '@/components/PokemonListing';
import { usePlausible } from 'next-plausible';

const Home: NextPage = () => {
  const {
    data: pokemonPair,
    refetch,
    isLoading,
  } = trpc.useQuery(['get-pokemon-pair'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const voteMutation = trpc.useMutation(['cast-vote']);
  const plausible = usePlausible();

  const voteForRoundest = (selected: number) => {
    if (!pokemonPair) return;

    if (selected === pokemonPair?.firstPokemon.id) {
      voteMutation.mutate({
        votedFor: pokemonPair.firstPokemon.id,
        votedAgainst: pokemonPair.secondPokemon.id,
      });
    } else {
      voteMutation.mutate({
        votedFor: pokemonPair.secondPokemon.id,
        votedAgainst: pokemonPair.firstPokemon.id,
      });
    }

    refetch();
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-creen flex flex-col justify-between items-center relative">
        {pokemonPair && (
          <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
            <PokemonListing
              pokemon={pokemonPair.firstPokemon}
              vote={() => voteForRoundest(pokemonPair.firstPokemon.id)}
              disabled={fetchingNext}
            />
            <div className="p-8 italic text-xl">{'or'}</div>
            <PokemonListing
              pokemon={pokemonPair.secondPokemon}
              vote={() => voteForRoundest(pokemonPair.secondPokemon.id)}
              disabled={fetchingNext}
            />
            <div className="p-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
