import { isNotNumber } from "./utils";

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day > 0).length;
  const average = dailyHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= target;
  const rating = average > target ? 3 : average === target ? 2 : 1;
  const ratingDescription = rating === 3 ? 'Excellent job!' : rating === 2 ? 'Not too bad but could be better' : 'bad';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  const target = process.argv[2];
  const dailyHours = process.argv.slice(3).map(day => Number(day));

  if (isNotNumber(target) || dailyHours.some(day => isNotNumber(day))) {
    throw new Error('Invalid input');
  }

  console.log(calculateExercises(dailyHours, Number(target)));
}