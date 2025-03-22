import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  port: 3000,
  cacheDir: path.join(__dirname, '../../cache'),
  uploadDir: path.join(__dirname, '../../uploads'),
  maxDepth: 10,
  fetchTimeout: 10000,
};