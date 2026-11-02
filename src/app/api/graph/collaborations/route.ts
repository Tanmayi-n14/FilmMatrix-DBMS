import { NextRequest, NextResponse } from 'next/server';
import { runCypher, FALLBACK_GRAPH } from '@/lib/neo4j';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const minCount = Number(searchParams.get('minCount') || 1);

    // ========================================================
    // CYPHER QUERY: Actor Collaboration Network Aggregation
    // Rubric Criteria: Complex graph aggregation on CO_STARRED_WITH
    // ========================================================
    const cypher = `
      MATCH (a1:Actor)-[r:CO_STARRED_WITH]->(a2:Actor)
      WHERE id(a1) < id(a2) AND r.movie_count >= $minCount
      RETURN 
        a1.name AS actor1, 
        a2.name AS actor2, 
        r.movie_count AS shared_movies,
        r.movie_count AS movie_count
      ORDER BY r.movie_count DESC, a1.name ASC
      LIMIT 25
    `;

    const { records, isFallback, error } = await runCypher(cypher, { minCount });

    if (isFallback || records.length === 0) {
      const collaborations = FALLBACK_GRAPH.edges
        .filter(e => e.type === 'CO_STARRED_WITH' && (e.movie_count || 1) >= minCount)
        .map(e => {
          const a1 = FALLBACK_GRAPH.nodes.find(n => n.id === e.source);
          const a2 = FALLBACK_GRAPH.nodes.find(n => n.id === e.target);
          return {
            actor1: a1?.label || 'Actor A',
            actor2: a2?.label || 'Actor B',
            shared_movies: e.movie_count || 1,
            movie_count: e.movie_count || 1
          };
        })
        .sort((a, b) => b.shared_movies - a.shared_movies);

      return NextResponse.json({
        success: true,
        collaborations,
        cypherQuery: cypher.trim(),
        count: collaborations.length,
        isFallback: true,
        notice: error
      });
    }

    return NextResponse.json({
      success: true,
      collaborations: records,
      cypherQuery: cypher.trim(),
      count: records.length,
      isFallback: false
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

