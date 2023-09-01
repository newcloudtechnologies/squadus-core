/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

const UTILS_FOLDER_PATH = './**/utils/**/*';
const UTILS_FILES_PATH = './**/utils.ts';

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [UTILS_FOLDER_PATH, UTILS_FILES_PATH],
    coverageDirectory: './coverage/',
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
    },
    testPathIgnorePatterns: ['/.coverage/', '/node_modules/', '/patches/'],
    transform: {
        '^.+\\.[t|j]sx?$': 'ts-jest',
    },
    coverageThreshold: {
        [UTILS_FOLDER_PATH]: { lines: 80 },
        [UTILS_FILES_PATH]: { lines: 80 },
    },
    roots: ['<rootDir>/src'],
};
