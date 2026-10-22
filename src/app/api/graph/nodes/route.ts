import { NextRequest, NextResponse } from 'next/server';
import { runCypher, FALLBACK_GRAPH } from '@/lib/neo4j';
import { getSessionFromRequest } from '@/lib/auth';

// POST: Create Node or Relationship in Neo4j
export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ error: 'Admin role required to modify Graph Database entities.' }, { status: 403 });
    }

    const body = await req.json();
    const { action, nodeType, properties, relationship } = body;

    if (action === 'create_node') {
      const { name, title, ...extra } = properties;
      const primaryProp = nodeType === 'Movie' ? 'title' : 'name';
      const label = title || name;

      if (!label) {
        return NextResponse.json({ error: 'Node title/name is required.' }, { status: 400 });
      }

      const cypher = `
        MERGE (n:${nodeType} {${primaryProp}: $label})
        SET n += $extra
        RETURN n
      `;

      const { records, isFallback } = await runCypher(cypher, { label, extra });

      if (isFallback) {
        const newId = `${nodeType.toLowerCase().substring(0, 3)}_${Date.now()}`;
        FALLBACK_GRAPH.nodes.push({
          id: newId,
          label,
          type: nodeType,
          ...extra
        });
      }

      return NextResponse.json({
        success: true,
        message: `${nodeType} node '${label}' successfully registered in Neo4j graph.`,
        isFallback
      });
    }

    if (action === 'create_relationship') {
      const { fromType, fromLabel, toType, toLabel, relType, relProps = {} } = relationship;

      const fromProp = fromType === 'Movie' ? 'title' : 'name';
      const toProp = toType === 'Movie' ? 'title' : 'name';

      const cypher = `
        MATCH (a:${fromType} {${fromProp}: $fromLabel}), (b:${toType} {${toProp}: $toLabel})
        MERGE (a)-[r:${relType}]->(b)
        SET r += $relProps
        RETURN a, r, b
      `;

      const { records, isFallback } = await runCypher(cypher, { fromLabel, toLabel, relProps });

      if (isFallback) {
        const fromNode = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === fromLabel.toLowerCase());
        const toNode = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === toLabel.toLowerCase());
        if (fromNode && toNode) {
          FALLBACK_GRAPH.edges.push({
            id: `e_${Date.now()}`,
            source: fromNode.id,
            target: toNode.id,
            type: relType,
            ...relProps
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: `Edge [:${relType}] created between '${fromLabel}' and '${toLabel}'.`,
        isFallback
      });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
