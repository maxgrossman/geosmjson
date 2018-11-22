import ElementJSON from '../Element/ElementJSON';

export default interface NodeJSON extends ElementJSON {
  lat: number;
  lon: number;
}