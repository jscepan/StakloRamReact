import { BaseModel } from 'src/models/base-model';
import { BASE_API_URL, INVOICE_TYPES, UOM_TYPES } from './constants';
import { WorkOrderModel } from 'src/models/work-order';

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return 'n/a';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (i === 0) {
    return bytes + ' ' + sizes[i];
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

export function constructUrl(
  endpoint: string,
  from?: number,
  to?: number
): string {
  let queryParamsStr = '';
  if (from !== undefined && to !== undefined) {
    queryParamsStr = `?skip=${from}&top=${to}`;
  }
  return endpoint + queryParamsStr;
}

export function getWorkOrderNumber(workOrder: WorkOrderModel): string {
  return (
    workOrder.number +
    '/' +
    new Date(workOrder.dateOfCreate).getFullYear().toString() //.substr(-2)
  );
}

export function getOid(_index: number, card: { oid: string }): string {
  return card.oid;
}

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toLocaleUpperCase();
}

export function mapExtensionToIcon(extension?: string): string {
  switch (extension) {
    case '3dm':
      return 'file-threedm';
    case 'docx':
    case 'jpg':
    case 'pdf':
    case 'png':
    case 'xlsx':
      return `file-${extension}`;
    default:
      return 'file-other';
  }
}

export function searchInText(searchText: string, fields: string[]): boolean {
  const searchWords: { word: string; found?: boolean }[] = searchText
    .split(' ')
    .map((st) => {
      return { word: st, found: false };
    });
  fields.forEach((field) => {
    if (field) {
      searchWords.forEach((obj) => {
        if (field.toLowerCase().includes(obj.word)) {
          obj.found = true;
        }
      });
    }
  });
  return searchWords.filter((sw) => sw.found).length === searchWords.length;
}

export function roundOnDigits(value: number, numberOfDigits = 2): number {
  return (
    Math.round(value * Math.pow(10, numberOfDigits)) /
    Math.pow(10, numberOfDigits)
  );
}

export function getConstructionMeasure(
  input: number,
  minConstructionMeasure = 3
): number {
  let value = Math.round(input);
  if (value <= input) {
    value++;
  }
  while (value % minConstructionMeasure !== 0) {
    value++;
  }
  return value;
}

export function getDaysBetweenTwoDates(first: Date, second: Date): number {
  return (first.getTime() - second.getTime()) / (1000 * 3600 * 24);
}

export function compareByValue(f1: BaseModel, f2: BaseModel) {
  return f1 && f2 && f1.oid === f2.oid;
}

export function getUOMDisplayValue(uom: string): string {
  return UOM_TYPES.filter((u) => u.value === uom)[0].displayName;
}

export function getTYPEDisplayValue(uom: string): string {
  return INVOICE_TYPES.filter((u) => u.value === uom)[0].displayName;
}

export function getWorkOrderImageUrl(url: string): string {
  return BASE_API_URL + '/images/' + url;
}
