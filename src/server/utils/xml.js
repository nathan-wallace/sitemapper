import { DOMParser } from 'xmldom';

// Parse XML string into a DOM document
export function parseXml(xmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  // Check for parsing errors and throw explicitly
  if (!doc || doc.getElementsByTagName('parsererror').length > 0) {
    throw new Error('Invalid XML content');
  }

  return doc;
}