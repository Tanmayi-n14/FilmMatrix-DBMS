import { NextRequest, NextResponse } from 'next/server';
import { runCypher, FALLBACK_GRAPH } from '@/lib/neo4j';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = (body.action || 'read').toLowerCase();
    const actor = body.actor || 'Joaquin Phoenix';
    const movie = body.movie || 'Napoleon';
    const role = body.role || 'Napoleon Bonaparte';
    const oscars = Number(body.oscars ?? 1);

    // ========================================================
    // 1. CREATE OPERATION
    // ========================================================
    if (action === 'create') {
      const cypher = `MERGE (a:Actor {name: $actor})
ON CREATE SET a.nationality = 'American', a.birth_year = 1974, a.oscar_wins = $oscars, a.created_at = datetime()
MERGE (m:Movie {title: $movie})
ON CREATE SET m.release_year = 2024, m.box_office = 221000000
MERGE (a)-[r:ACTED_IN {role: $role, billing_order: 1}]->(m)
RETURN a.name AS actor, r.role AS role, m.title AS movie`;

      const { records, isFallback, error } = await runCypher(cypher, { actor, movie, role, oscars });

      // Fallback in-memory mutation
      let existingNode = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === actor.toLowerCase());
      if (!existingNode) {
        existingNode = { id: `act_${Date.now()}`, label: actor, type: 'Actor', nationality: 'American', birth_year: 1974, oscar_wins: oscars };
        (FALLBACK_GRAPH.nodes as any).push(existingNode);
      }
      let existingMovie = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === movie.toLowerCase());
      if (!existingMovie) {
        existingMovie = { id: `mov_${Date.now()}`, label: movie, type: 'Movie', release_year: 2024, box_office: 221000000 };
        (FALLBACK_GRAPH.nodes as any).push(existingMovie);
      }
      (FALLBACK_GRAPH.edges as any).push({
        id: `e_${Date.now()}`,
        source: existingNode.id,
        target: existingMovie.id,
        type: 'ACTED_IN',
        role,
        order: 1
      });

      return NextResponse.json({
        success: true,
        action: 'CREATE',
        cypher,
        actor,
        movie,
        role,
        oscars,
        isFallback,
        message: `Successfully created (:Actor {name: "${actor}"})-[:ACTED_IN {role: "${role}"}]->(:Movie {title: "${movie}"})`,
        data: { actor, role, movie }
      });
    }

    // ========================================================
    // 2. READ OPERATION
    // ========================================================
    if (action === 'read') {
      const isAllQuery = !actor || actor.trim().toLowerCase() === 'all';
      const cypher = isAllQuery
        ? `MATCH (a:Actor)-[r:ACTED_IN]->(m:Movie)
WHERE m.release_year >= 2020
RETURN a.name AS actor, r.role AS character_name, m.title AS movie, m.release_year AS release_year, m.box_office AS box_office
ORDER BY m.box_office DESC
LIMIT 10`
        : `MATCH (a:Actor {name: $actor})-[r:ACTED_IN]->(m:Movie)
RETURN a.name AS actor, r.role AS character_name, m.title AS movie, m.release_year AS release_year, m.box_office AS box_office
ORDER BY m.release_year DESC`;

      const { records, isFallback, error } = await runCypher(cypher, isAllQuery ? {} : { actor });

      let resultRecords: any[] = [];
      if (!isFallback) {
        // Connected to live Neo4j database
        resultRecords = records;
      } else {
        // Fallback in-memory
        let fallbackRecords = FALLBACK_GRAPH.edges
          .filter(e => e.type === 'ACTED_IN')
          .map(e => {
            const actNode = FALLBACK_GRAPH.nodes.find(n => n.id === e.source);
            const movNode = FALLBACK_GRAPH.nodes.find(n => n.id === e.target);
            return {
              actor: actNode?.label || 'Actor',
              character_name: (e as any).role || 'Lead Role',
              movie: movNode?.label || 'Movie',
              release_year: (movNode as any)?.release_year || 2023,
              box_office: (movNode as any)?.box_office || 500000000
            };
          });

        if (isAllQuery) {
          resultRecords = fallbackRecords.filter(r => r.release_year >= 2020).slice(0, 10);
        } else {
          resultRecords = fallbackRecords.filter(r => r.actor.toLowerCase() === actor.toLowerCase());
        }
      }

      const sanitizedRecords = resultRecords.map((r: any) => {
        const obj: any = {};
        for (const [k, v] of Object.entries(r)) {
          if (v && typeof v === 'object' && 'low' in (v as any) && 'high' in (v as any)) {
            obj[k] = (v as any).low;
          } else {
            obj[k] = v;
          }
        }
        return obj;
      });

      return NextResponse.json({
        success: true,
        action: 'READ',
        cypher,
        actor: isAllQuery ? 'All Blockbusters (>= 2020)' : actor,
        isFallback,
        records: sanitizedRecords,
        message: sanitizedRecords.length > 0
          ? `Found ${sanitizedRecords.length} graph record(s) for ${isAllQuery ? 'Recent Blockbusters' : actor}.`
          : `0 records found for "${actor}" in Neo4j. (Node has not been created yet. Click CREATE to add ${actor}!)`
      });
    }

    // ========================================================
    // 3. UPDATE OPERATION
    // ========================================================
    if (action === 'update') {
      const cypher = `MATCH (a:Actor {name: $actor})
SET a.oscar_wins = $oscars,
    a.last_accolade = 'Academy Award Best Actor',
    a.updated_at = datetime()
RETURN a.name AS actor, a.oscar_wins AS oscar_wins, a.last_accolade AS accolade`;

      const { records, isFallback, error } = await runCypher(cypher, { actor, oscars });

      const targetActor = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === actor.toLowerCase());
      if (targetActor) {
        (targetActor as any).oscar_wins = oscars;
        (targetActor as any).last_accolade = 'Academy Award Best Actor';
      }

      return NextResponse.json({
        success: true,
        action: 'UPDATE',
        cypher,
        actor,
        oscars,
        isFallback,
        message: `Successfully mutated (:Actor {name: "${actor}"}) -> SET oscar_wins = ${oscars}, updated_at = datetime()`,
        data: { actor, oscar_wins: oscars, last_accolade: 'Academy Award Best Actor' }
      });
    }

    // ========================================================
    // 4. DELETE OPERATION
    // ========================================================
    if (action === 'delete') {
      const targetActorName = actor || 'Joaquin Phoenix';
      const cypher = `MATCH (a:Actor {name: $actor})
DETACH DELETE a`;

      const { isFallback, error } = await runCypher(cypher, { actor: targetActorName });

      const actorNode = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === targetActorName.toLowerCase());
      if (actorNode) {
        const actorId = actorNode.id;
        (FALLBACK_GRAPH as any).edges = FALLBACK_GRAPH.edges.filter(
          e => e.source !== actorId && e.target !== actorId
        );
      }

      return NextResponse.json({
        success: true,
        action: 'DELETE',
        cypher,
        actor: targetActorName,
        isFallback,
        message: `Executed DETACH DELETE on Actor node "${targetActorName}". All incident edges and relationships purged.`
      });
    }

    return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
