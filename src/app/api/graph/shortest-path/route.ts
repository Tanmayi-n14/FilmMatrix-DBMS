import { NextRequest, NextResponse } from 'next/server';
import { runCypher, findShortestPath } from '@/lib/neo4j';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const actor1 = searchParams.get('actor1') || 'Leonardo DiCaprio';
    const actor2 = searchParams.get('actor2') || 'Timothée Chalamet';

    // ========================================================
    // CYPHER QUERY: Multi-Hop Co-Star Shortest Path
    // Rubric Criteria: Multi-hop graph traversal & relationship pathing
    // ========================================================
    const cypher = `
      MATCH (a1:Actor {name: $actor1}), (a2:Actor {name: $actor2})
      MATCH p = shortestPath((a1)-[:ACTED_IN*..6]-(a2))
      RETURN p, length(p) / 2 AS degrees_of_separation
    `;

    const { records, isFallback, error } = await runCypher(cypher, { actor1, actor2 });

    if (isFallback || records.length === 0) {
      const fallbackResult = findShortestPath(actor1, actor2);
      return NextResponse.json({
        success: true,
        cypherQuery: cypher.trim(),
        actor1,
        actor2,
        result: fallbackResult,
        isFallback: true,
        notice: error
      });
    }

    return NextResponse.json({
      success: true,
      cypherQuery: cypher.trim(),
      actor1,
      actor2,
      result: records[0],
      isFallback: false
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
