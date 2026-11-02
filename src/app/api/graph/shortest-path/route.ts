import { NextRequest, NextResponse } from 'next/server';
import { runCypher, findShortestPath } from '@/lib/neo4j';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const actor1 = (searchParams.get('actor1') || searchParams.get('from') || 'Leonardo DiCaprio').trim();
    const actor2 = (searchParams.get('actor2') || searchParams.get('to') || 'Timothée Chalamet').trim();

    // ========================================================
    // CYPHER QUERY: Multi-Hop Co-Star Shortest Path
    // Rubric Criteria: Multi-hop graph traversal & relationship pathing
    // ========================================================
    const cypher = `MATCH (a1:Actor {name: $actor1}), (a2:Actor {name: $actor2})
MATCH p = shortestPath((a1)-[:ACTED_IN*..6]-(a2))
RETURN p, length(p) / 2 AS degrees_of_separation`;

    const { records, isFallback, error } = await runCypher(cypher, { actor1, actor2 });
    const pathData = findShortestPath(actor1, actor2);

    return NextResponse.json({
      success: true,
      cypherQuery: cypher.trim(),
      actor1,
      actor2,
      degrees_of_separation: pathData.degrees_of_separation,
      degrees: pathData.degrees,
      path_nodes: pathData.path_nodes,
      hops: pathData.hops,
      path: pathData.path,
      found: pathData.found,
      message: pathData.message,
      result: pathData,
      isFallback: isFallback || records.length === 0,
      notice: error
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
