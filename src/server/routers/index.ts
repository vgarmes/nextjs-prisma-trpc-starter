import * as trpc from '@trpc/server';
import { z } from 'zod';
import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { prisma } from 'db';

export const appRouter = trpc
  .router()
  .query('get-pokemon-pair', {
    async resolve() {
      const [first, second] = getOptionsForVote();

      const bothPokemon = await prisma.pokemon.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothPokemon.length !== 2)
        throw new Error('Failed to find two Pokemon');

      return { firstPokemon: bothPokemon[0], secondPokemon: bothPokemon[1] };
    },
  })
  .mutation('cast-vote', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
