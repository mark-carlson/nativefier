import * as os from 'os';
import * as path from 'path';

import * as axios from 'axios';
import * as hasbin from 'hasbin';

function isOSX() {
  return os.platform() === 'darwin';
}

function isWindows() {
  return os.platform() === 'win32';
}

function downloadFile(fileUrl) {
  return axios
    .get(fileUrl, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      if (!response.data) {
        return null;
      }
      return {
        data: response.data,
        ext: path.extname(fileUrl),
      };
    });
}

function allowedIconFormats(platform) {
  const hasIdentify = hasbin.sync('identify');
  const hasConvert = hasbin.sync('convert');
  const hasIconUtil = hasbin.sync('iconutil');

  const pngToIcns = hasConvert && hasIconUtil;
  const pngToIco = hasConvert;
  const icoToIcns = pngToIcns && hasIdentify;
  const icoToPng = hasConvert;

  // todo scripts for the following
  const icnsToPng = false;
  const icnsToIco = false;

  const formats = [];

  // todo shell scripting is not supported on windows, temporary override
  if (isWindows()) {
    switch (platform) {
      case 'darwin':
        formats.push('.icns');
        break;
      case 'linux':
        formats.push('.png');
        break;
      case 'win32':
        formats.push('.ico');
        break;
      default:
        throw new Error(
          `function allowedIconFormats error: Unknown platform ${platform}`,
        );
    }
    return formats;
  }

  switch (platform) {
    case 'darwin':
      formats.push('.icns');
      if (pngToIcns) {
        formats.push('.png');
      }
      if (icoToIcns) {
        formats.push('.ico');
      }
      break;
    case 'linux':
      formats.push('.png');
      if (icoToPng) {
        formats.push('.ico');
      }
      if (icnsToPng) {
        formats.push('.icns');
      }
      break;
    case 'win32':
      formats.push('.ico');
      if (pngToIco) {
        formats.push('.png');
      }
      if (icnsToIco) {
        formats.push('.icns');
      }
      break;
    default:
      throw new Error(
        `function allowedIconFormats error: Unknown platform ${platform}`,
      );
  }
  return formats;
}

export default {
  isOSX,
  isWindows,
  downloadFile,
  allowedIconFormats,
};
