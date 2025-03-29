import diagnoseData from '../../data/diagnoses';
import { Diagnoses } from '../types';

const getEntries = () => {
  return diagnoseData as Diagnoses[];
}; 

export default {
  getEntries,
};