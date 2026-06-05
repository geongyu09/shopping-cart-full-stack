/**
 * MSW v2 + Jest(jsdom) 폴리필.
 *
 * jsdom 환경에는 Node 의 web 표준 전역(TextEncoder, fetch, Request, Response 등)이
 * 노출되지 않아 MSW 의 요청 가로채기가 동작하지 않는다. 테스트 프레임워크보다 먼저
 * 실행되어야 하므로 `setupFiles`(setupFilesAfterEnv 아님)로 등록한다.
 *
 * @see https://mswjs.io/docs/migrations/1.x-to-2.x/#frequent-issues (Jest)
 */

// configurable: true 로 두어야 @mswjs/interceptors 가 fetch/Request 헤더 기록을 위해
// 전역을 재정의(redefine)할 수 있다.
const define = (entries) => {
  const descriptors = {};
  for (const [key, value] of Object.entries(entries)) {
    descriptors[key] = { value, writable: true, configurable: true };
  }
  Object.defineProperties(globalThis, descriptors);
};

const { TextDecoder, TextEncoder } = require("node:util");
const {
  ReadableStream,
  TransformStream,
  WritableStream,
} = require("node:stream/web");
const { BroadcastChannel } = require("node:worker_threads");
const { Blob, File } = require("node:buffer");

// undici 는 로드 시점에 전역 TextEncoder 를 참조하므로 먼저 정의한 뒤 require 한다.
define({
  TextDecoder,
  TextEncoder,
  ReadableStream,
  TransformStream,
  WritableStream,
  BroadcastChannel,
  Blob,
  File,
});

const {
  fetch: undiciFetch,
  Headers,
  FormData,
  Request: UndiciRequest,
  Response,
} = require("undici");

// 앱 fetcher 는 "/api/..." 상대경로로 요청한다. undici 의 fetch/Request 는 절대 URL 만
// 허용하므로(브라우저처럼 location 기준으로 해석하지 않음), 상대경로를 origin 기준으로
// 보정한다. MSW 핸들러도 location("http://localhost/") 기준으로 매칭된다.
const ORIGIN = "http://localhost";

const resolveInput = (input) =>
  typeof input === "string" && input.startsWith("/") ? ORIGIN + input : input;

class Request extends UndiciRequest {
  constructor(input, init) {
    super(resolveInput(input), init);
  }
}

const fetch = (input, init) => undiciFetch(resolveInput(input), init);

define({
  Headers,
  FormData,
  fetch,
  Request,
  Response,
});
