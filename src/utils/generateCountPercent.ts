import { PokemonResult } from './getPokemonInOrder';
const generateCountPercent = (pokemon: PokemonResult) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

export default generateCountPercent;
