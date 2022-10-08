# Genetic Algorithm
> Genetic algorithm in which a swarm of 'cars' learns to drive towards a user placed target.  
  
> [Video showcase]("https://youtu.be/oQ05nK9OzcY")

# Technical Details
**The algorithm**
- Cars are initialised with a 'dna string' containing random vectors.
- Each car follows these unique vectors for a specified amount of time.
- The closer the car got to the target, the higher its fitness score.
- Cars are added into the 'candidates' pool, cars are added multipled times, proportional to their fitness values.  
- When the next generation is being created, two parents are chosen at random from the candidate pool.
- High fitness cars from the previous generation have a higher chance of being chosen.
- The child duplicates one half of each parent's dna string, bisecting the parents' string at a random point.
- This repeats until the next generation is large enough, and the cycle repeats.

