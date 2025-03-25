import { isNotNumber } from "./utils";

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / Math.pow(height / 100, 2));
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  const height = process.argv[2];
  const weight = process.argv[3];

  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error('Invalid input');
  }

  console.log(calculateBmi(Number(height), Number(weight)));
}