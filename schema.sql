CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    created_at TEXT default CURRENT_TIMESTAMP,
    updated_at TEXT default CURRENT_TIMESTAMP,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testimoni (
    id INTEGER PRIMARY KEY,
    created_at TEXT default CURRENT_TIMESTAMP,
    updated_at TEXT default CURRENT_TIMESTAMP,
    nama TEXT NOT NULL,
    profesi TEXT DEFAULT "Tidak Diketahui",
    pesan TEXT NOT NULL
);