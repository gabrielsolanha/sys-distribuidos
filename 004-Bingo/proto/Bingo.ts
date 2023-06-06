import type * as grpc from '@grpc/grpc-js';
import type { ServiceDefinition, EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { BingoClient as _BingoClient, BingoDefinition as _BingoDefinition } from './Bingo';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  Bingo: SubtypeConstructor<typeof grpc.Client, _BingoClient> & { service: _BingoDefinition }
  GameStatusResponse: MessageTypeDefinition
  LoginRequest: MessageTypeDefinition
  LoginResponse: MessageTypeDefinition
  PlayRequest: MessageTypeDefinition
  ReadyRequest: MessageTypeDefinition
  ReadyResponse: MessageTypeDefinition
  WinCheckRequest: MessageTypeDefinition
  WinCheckResponse: MessageTypeDefinition
}

} from './ReadyResponse';
import type { WinCheckRequest as _WinCheckRequest, WinCheckRequest__Output as _WinCheckRequest__Output } from './WinCheckRequest';
import type { WinCheckResponse as _WinCheckResponse, WinCheckResponse__Output as _WinCheckResponse__Output } from './WinCheckResponse';

export interface BingoClient extends grpc.Client {
  CheckWin(argument: _WinCheckRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  CheckWin(argument: _WinCheckRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  CheckWin(argument: _WinCheckRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  CheckWin(argument: _WinCheckRequest, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  checkWin(argument: _WinCheckRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  checkWin(argument: _WinCheckRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  checkWin(argument: _WinCheckRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  checkWin(argument: _WinCheckRequest, callback: (error?: grpc.ServiceError, result?: _WinCheckResponse__Output) => void): grpc.ClientUnaryCall;
  
  Login(argument: _LoginRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_LoginResponse__Output>;
  Login(argument: _LoginRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_LoginResponse__Output>;
  login(argument: _LoginRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_LoginResponse__Output>;
  login(argument: _LoginRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_LoginResponse__Output>;
  
  Play(argument: _PlayRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_GameStatusResponse__Output>;
  Play(argument: _PlayRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_GameStatusResponse__Output>;
  play(argument: _PlayRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_GameStatusResponse__Output>;
  play(argument: _PlayRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_GameStatusResponse__Output>;
  
  Ready(argument: _ReadyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  Ready(argument: _ReadyRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  Ready(argument: _ReadyRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  Ready(argument: _ReadyRequest, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  ready(argument: _ReadyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  ready(argument: _ReadyRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  ready(argument: _ReadyRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  ready(argument: _ReadyRequest, callback: (error?: grpc.ServiceError, result?: _ReadyResponse__Output) => void): grpc.ClientUnaryCall;
  
}

export interface BingoHandlers extends grpc.UntypedServiceImplementation {
  CheckWin: grpc.handleUnaryCall<_WinCheckRequest__Output, _WinCheckResponse>;
  
  Login: grpc.handleServerStreamingCall<_LoginRequest__Output, _LoginResponse>;
  
  Play: grpc.handleServerStreamingCall<_PlayRequest__Output, _GameStatusResponse>;
  
  Ready: grpc.handleUnaryCall<_ReadyRequest__Output, _ReadyResponse>;
  
}

export interface BingoDefinition extends grpc.ServiceDefinition {
  CheckWin: MethodDefinition<_WinCheckRequest, _WinCheckResponse, _WinCheckRequest__Output, _WinCheckResponse__Output>
  Login: MethodDefinition<_LoginRequest, _LoginResponse, _LoginRequest__Output, _LoginResponse__Output>
  Play: MethodDefinition<_PlayRequest, _GameStatusResponse, _PlayRequest__Output, _GameStatusResponse__Output>
  Ready: MethodDefinition<_ReadyRequest, _ReadyResponse, _ReadyRequest__Output, _ReadyResponse__Output>
}
