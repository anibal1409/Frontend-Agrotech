import { Crop } from '../models/crop.model';
import { Document } from '../models/document.model';

export interface IResultStudy {
  crop: Crop;
  document: Document;
}