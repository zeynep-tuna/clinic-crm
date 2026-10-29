import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, posix, resolve, sep } from 'path';

export const MAX_RADIOGRAPH_FILE_SIZE = 20 * 1024 * 1024;

const UPLOAD_ROOT = resolve(process.env.UPLOAD_DIR ?? 'uploads');

interface DetectedImage {
  mimeType: 'image/png' | 'image/jpeg';
  extension: 'png' | 'jpg';
}

// The client-sent Content-Type is not trusted; the file signature decides.
export function detectImageType(buffer: Buffer): DetectedImage | null {
  if (
    buffer.length >= 8 &&
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return { mimeType: 'image/png', extension: 'png' };
  }

  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { mimeType: 'image/jpeg', extension: 'jpg' };
  }

  return null;
}

function resolveStoragePath(storageKey: string): string {
  const fullPath = resolve(UPLOAD_ROOT, storageKey);

  if (!fullPath.startsWith(UPLOAD_ROOT + sep)) {
    throw new Error('Invalid storage key');
  }

  return fullPath;
}

export async function saveRadiographFile(
  storageKey: string,
  buffer: Buffer,
): Promise<void> {
  const fullPath = resolveStoragePath(storageKey);
  await mkdir(dirname(fullPath), { recursive: true });
  await writeFile(fullPath, buffer, { flag: 'wx' });
}

export function readRadiographFile(storageKey: string): Promise<Buffer> {
  return readFile(resolveStoragePath(storageKey));
}

export function buildStorageKey(
  clinicId: string,
  radiographId: string,
  extension: string,
): string {
  // Stored in the database, so always use '/' regardless of the host OS.
  return posix.join('radiographs', clinicId, `${radiographId}.${extension}`);
}
