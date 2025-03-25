import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';


interface Request {
  daily_exercises: number[];
  target: number;
};



const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});


app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as Request;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (isNotNumber(target) || daily_exercises.some(day => isNotNumber(day))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});




const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});