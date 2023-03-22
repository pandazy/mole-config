import { resolve } from 'path';
import process from 'process';

export function getRoot(): string {
  return resolve(__dirname, '..');
}

export function getVendorPath(...paths: string[]): string {
  return resolve(getRoot(), ...paths);
}

export function getUserPath(...paths: string[]): string {
  return resolve(process.cwd(), ...paths);
}
