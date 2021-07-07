export const createMatches = (participants, tournamentRef) => {
  if (participants.length % 2 == 1) {
    participants.push(null)
  }

  const playerCount = participants.length
  const rounds = playerCount - 1
  const half = playerCount / 2

  const tournamentPairings = []

  const playerIndexes = participants.map((_, i) => i).slice(1)

  for (let round = 0; round < rounds; round++) {
    const newPlayerIndexes = [0].concat(playerIndexes)

    const firstHalf = newPlayerIndexes.slice(0, half)
    const secondHalf = newPlayerIndexes.slice(half, playerCount).reverse()

    for (let i = 0; i < firstHalf.length; i++) {
      if (participants[firstHalf[i]] && participants[secondHalf[i]]) {
        tournamentPairings.push({
          playerA: participants[firstHalf[i]].ref,
          playerB: participants[secondHalf[i]].ref,
          tournamentRef,
        })
      }
    }

    // rotating the array
    playerIndexes.push(playerIndexes.shift())
  }

  return tournamentPairings
}
