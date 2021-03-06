/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as util from '../util';

export function assertConcat3DShapesMatch(
    x1Shape: number[], x2Shape: number[], axis: number,
    errorMessagePrefix = '') {
  util.assert(
      x1Shape.length === 3,
      errorMessagePrefix + 'Concat3D x1 shape should be of rank 3.');
  util.assert(
      x2Shape.length === 3,
      errorMessagePrefix + 'Concat3D x2 shape should be of rank 3.');

  util.assert(
      axis >= 0 && axis < 3, 'Axis for concat3D must be between 0 and 2.');

  for (let i = 0; i < 3; i++) {
    util.assert(
        (i === axis) || (x1Shape[i] === x2Shape[i]),
        errorMessagePrefix +
            `Shape (${x1Shape}) does not match (${x2Shape}) along ` +
            `non-concatenated axis.`);
  }
}

export function computeConcat3DOutputShape(
    x1Shape: number[], x2Shape: number[],
    axis: number): [number, number, number] {
  util.assert(x1Shape.length === 3, 'Concat3D x1 shape should be of rank 3.');
  util.assert(x2Shape.length === 3, 'Concat3D x2shape should be of rank 3.');

  const outputShape = x1Shape.slice();
  outputShape[axis] += x2Shape[axis];
  return outputShape as [number, number, number];
}
