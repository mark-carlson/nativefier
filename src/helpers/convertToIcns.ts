import * as path from 'path';
import * as tmp from 'tmp';

import * as shell from 'shelljs';

import helpers from './helpers';

const { isOSX } = helpers;
tmp.setGracefulCleanup();

const PNG_TO_ICNS_BIN_PATH = path.join(__dirname, '../..', 'bin/convertToIcns');

function convertToIcns(
  pngSource: string,
  iconsDestination: string,
  callback: (error: any, iconsDestination: string) => void,
): void {
  if (!isOSX()) {
    callback('OSX is required to convert a .png icon to .icns', pngSource);
    return;
  }

  shell.exec(
    `"${PNG_TO_ICNS_BIN_PATH}" "${pngSource}" "${iconsDestination}"`,
    { silent: true },
    (exitCode, stdOut, stdError) => {
      if (stdOut.includes('icon.iconset:error') || exitCode) {
        if (exitCode) {
          callback(
            {
              stdOut,
              stdError,
            },
            pngSource,
          );
          return;
        }

        callback(stdOut, pngSource);
        return;
      }

      callback(null, iconsDestination);
    },
  );
}

/**
 * Converts the png to a temp directory which will be cleaned up on process exit
 */
function convertToIcnsTmp(
  pngSrc: string,
  callback: (error: any, iconsDestination: string) => void,
): void {
  const tempIconDirObj = tmp.dirSync({ unsafeCleanup: true });
  const tempIconDirPath = tempIconDirObj.name;
  convertToIcns(pngSrc, `${tempIconDirPath}/icon.icns`, callback);
}

export default convertToIcnsTmp;
