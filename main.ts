import { serveDir } from "https://deno.land/std@0.173.0/http/file_server.ts";
import { serve as httpServe } from "https://deno.land/std@0.182.0/http/server.ts";
import { serve as backendServe } from "./backend/main.ts";

if (import.meta.main) {
  await Promise.all([
    backendServe(),
    httpServe((req) => {
      return serveDir(req, {
        fsRoot: "./frontend/dist",
      });
    }),
  ]);
}
