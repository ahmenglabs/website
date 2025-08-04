import { Context } from "hono"
import { BlankInput } from "hono/types"
import { Bindings } from "./app"

export async function getListTestimoni(
  ctx: Context<
    {
      Bindings: Bindings
    },
    "/testimoni/list",
    BlankInput
  >
) {
  const result = await ctx.env.database.prepare("SELECT * FROM testimoni ORDER BY created_at DESC").all()
  if (result.success) {
    return ctx.json(result.results)
  } else {
    return ctx.json({ error: "Failed to fetch testimonies" }, 500)
  }
}

export async function addNewTestimoni(
  ctx: Context<
    {
      Bindings: Bindings
    },
    "/testimoni/add",
    BlankInput
  >
) {
  try {
    const { nama, profesi, pesan } = await ctx.req.json()

    if (!nama || !pesan) {
      return ctx.json(
        {
          error: "Nama dan pesan testimoni wajib diisi!",
        },
        400
      )
    }

    if (nama.length > 100) {
      return ctx.json(
        {
          error: "Nama terlalu panjang! Maksimal 100 karakter.",
        },
        400
      )
    }

    if (profesi && profesi.length > 100) {
      return ctx.json(
        {
          error: "Profesi terlalu panjang! Maksimal 100 karakter.",
        },
        400
      )
    }

    if (pesan.length < 5) {
      return ctx.json(
        {
          error: "Pesan testimoni terlalu pendek! Minimal 5 karakter.",
        },
        400
      )
    }

    if (pesan.length > 500) {
      return ctx.json(
        {
          error: "Pesan testimoni terlalu panjang! Maksimal 500 karakter.",
        },
        400
      )
    }

    const cleanNama = nama.trim()
    const cleanProfesi = profesi ? profesi.trim() : "Tidak Diketahui"
    const cleanPesan = pesan.trim()

    const result = await ctx.env.database
      .prepare("INSERT INTO testimoni (nama, profesi, pesan) VALUES (?, ?, ?)")
      .bind(cleanNama, cleanProfesi, cleanPesan)
      .run()

    if (result.success) {
      return ctx.json(
        {
          message: "Testimoni berhasil dikirim! Terima kasih atas feedback Anda.",
        },
        201
      )
    } else {
      return ctx.json(
        {
          error: "Maaf, terjadi kesalahan saat menyimpan testimoni. Silakan coba lagi.",
        },
        500
      )
    }
  } catch (error) {
    return ctx.json(
      {
        error: "Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat.",
      },
      500
    )
  }
}
