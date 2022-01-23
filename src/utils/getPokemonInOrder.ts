import { AsyncReturnType } from '@/utils/ts-bs';

export type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;
export type PokemonResult = Exclude<PokemonQueryResult, undefined>[number];

const getPokemonInOrder = async () => {
  return await prisma?.pokemon.findMany({
    orderBy: {
      VoteFor: { _count: 'desc' },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

export default getPokemonInOrder;
