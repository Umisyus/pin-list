import Database from "better-sqlite3";
import type { pindata } from "./pin-data";
import type { ExtractedPin } from './ExtractedPin';
import { ERRORS } from "./errors.js";

let db = new Database('database.db')
db.exec('CREATE TABLE IF NOT EXISTS pins (id TEXT UNIQUE NOT NULL PRIMARY KEY, title TEXT, board TEXT, url TEXT, username TEXT, hash TEXT);')
db.pragma('journal_mode = WAL');

export function saveToDB({ id, name, url, board, username, hash }: Pick<ExtractedPin, 'id' | 'name' | 'url' | 'board' | 'username' | 'hash'>) {

    try {
        const stmt = db.prepare('INSERT INTO pins VALUES (?, ?, ?, ?, ?, ?);');
        stmt.run(id, name, board, url, username, hash);
        console.log('SAVED TO DATABASE!!!');
    }
    catch (err: any) {
        console.error(ERRORS.DATABASE_ERROR, err);

    }
}

export function getAllPinIDs(): string[] {
    const stmt = db.prepare('SELECT id FROM pins;')
    return stmt.all() as any as string[]
}


export function getAllPins(count?: number): string[] {
    const limit = count ? `LIMIT ${count}` : ''
    const stmt = db.prepare(`SELECT * FROM pins ${limit};`)
    return stmt.all() as any as string[]
}

export function getPinByID(id: string): ExtractedPin | null {
    const stmt = db.prepare('SELECT * FROM pins WHERE id = ?')
    return (stmt.get(id) as ExtractedPin) ?? null
}

export function pinExists(pin_id: string): boolean {
    let stmt = db.prepare('SELECT * FROM pins WHERE id = ?')
    let res = stmt.get(pin_id)
    if (res) {
        return true
    }
    return false
}

export function getPinsForUser(username: string): ExtractedPin[] {
    const stmt = db.prepare('SELECT * FROM pins WHERE username = ?')
    return (stmt.all(username) ?? []) as ExtractedPin[]
}
