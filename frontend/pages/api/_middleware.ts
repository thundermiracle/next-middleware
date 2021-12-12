/* eslint-disable @next/next/no-server-import-in-page */
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import pipeToApiServer from "../../lib/pipeToApiServer";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.url.startsWith("/api")) {
  //   return await pipeToApiServer(req);
  // }

  // return NextResponse.next();
  console.log("request from api");
  return await pipeToApiServer(req);
}
