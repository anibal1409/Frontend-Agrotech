import { Crop } from '../models/crop.model';
import { Document } from '../models/document.model';

export interface IResultStudy {
  crops: Crop[];
  documents: Document[];
}