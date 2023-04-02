import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

const router = new Router();
router
  // 2023-04-02/342/615"
  .get("/:date/:gouvernorat/:delegation", async (context) => {
    const date = context.params.date;
    const gouvernorat = context.params.gouvernorat;
    const delegation = context.params.delegation;

    try {
      const onlineTimes = await fetch(
        `https://www.meteo.tn/horaire_gouvernorat/${date}/${gouvernorat}/${delegation}`,
      ).then((r) => r.json());
      context.response.body = onlineTimes;
    } catch {
      context.response.body = {};
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server listening on http://localhost:3000");
await app.listen({ port: 3000 });

