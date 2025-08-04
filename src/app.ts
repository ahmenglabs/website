import { D1Database } from "@cloudflare/workers-types/experimental"
import { Hono } from "hono"
import { getListTestimoni, addNewTestimoni } from "./testimoni"

export type Bindings = {
  database: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get("/testimoni/list", async (ctx) => {
  return await getListTestimoni(ctx)
})

app.post("/testimoni/add", async (ctx) => {
  return await addNewTestimoni(ctx)
})

export default app
