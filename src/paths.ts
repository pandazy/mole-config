import path from 'path';

export default function getRoot() {
  return path.resolve(__dirname, '..');
}

export function getVendorPath(...paths: string[]) {
  return path.resolve(getRoot(), ...paths);
}

export function getUserPath(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}
