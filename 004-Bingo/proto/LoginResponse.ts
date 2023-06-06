// Original file: proto/bingo.proto


export interface LoginResponse {
  'token'?: (string);
  'playersLoggedIn'?: (string)[];
  'playersReady'?: (string)[];
  'status'?: (number);
  'message'?: (string);
}

export interface LoginResponse__Output {
  'token'?: (string);
  'playersLoggedIn'?: (string)[];
  'playersReady'?: (string)[];
  'status'?: (number);
  'message'?: (string);
}
