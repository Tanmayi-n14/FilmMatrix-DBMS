import { NextRequest, NextResponse } from 'next/server';
import { query, getMySQLPool } from '@/lib/mysql';
import { runCypher } from '@/lib/neo4j';

export async function POST(req: NextRequest) {
  try {
    const { type, query: code } = await req.json();

    if (!code || !code.trim()) {
      return NextResponse.json({ error: 'Query statement cannot be empty' }, { status: 400 });
    }

    const trimmed = code.trim();

    if (type === 'cypher') {
      const { records, isFallback, error } = await runCypher(trimmed);
      return NextResponse.json({
        success: true,
        type: 'cypher',
        result: records,
        rowCount: records.length,
        isFallback,
        error
      });
    }

    // SQL Execution
    try {
      const p = getMySQLPool();
      const [rows]: any = await p.query(trimmed);
      return NextResponse.json({
        success: true,
        type: 'sql',
        result: rows,
        rowCount: Array.isArray(rows) ? rows.length : (rows?.affectedRows ?? 1),
        isFallback: false
      });
    } catch (dbErr: any) {
      // Fallback query executor for in-memory emulation
      const { rows, isFallback, error } = await query(trimmed);
      return NextResponse.json({
        success: true,
        type: 'sql',
        result: rows,
        rowCount: Array.isArray(rows) ? rows.length : 0,
        isFallback: true,
        notice: dbErr.message
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
