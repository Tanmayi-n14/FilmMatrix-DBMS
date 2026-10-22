import { NextRequest, NextResponse } from 'next/server';
import { runCypher, FALLBACK_GRAPH } from '@/lib/neo4j';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterType = searchParams.get('type'); // 'Actor', 'Director', 'Movie', 'Genre'

    const cypher = `
      MATCH (n)
      OPTIONAL MATCH (n)-[r]->(m)
      RETURN n, r, m
      LIMIT 100
    `;

    const { records, isFallback, error } = await runCypher(cypher);

    if (isFallback || records.length === 0) {
      let nodes = FALLBACK_GRAPH.nodes;
      let edges = FALLBACK_GRAPH.edges;

      if (filterType) {
        nodes = nodes.filter(n => n.type === filterType);
        const nodeIds = new Set(nodes.map(n => n.id));
        edges = edges.filter(e => nodeIds.has(e.source) || nodeIds.has(e.target));
      }

      return NextResponse.json({
        success: true,
        nodes,
        edges,
        totalNodes: nodes.length,
        totalEdges: edges.length,
        isFallback: true,
        notice: error
      });
    }

    // Transform Neo4j records into web-friendly nodes and links
    const nodeMap = new Map();
    const links: any[] = [];

    records.forEach((rec: any) => {
      const n = rec.n;
      const r = rec.r;
      const m = rec.m;

      if (n && !nodeMap.has(n.identity.toString())) {
        nodeMap.set(n.identity.toString(), {
          id: n.identity.toString(),
          label: n.properties.name || n.properties.title,
          type: n.labels[0],
          ...n.properties
        });
      }
      if (m && !nodeMap.has(m.identity.toString())) {
        nodeMap.set(m.identity.toString(), {
          id: m.identity.toString(),
          label: m.properties.name || m.properties.title,
          type: m.labels[0],
          ...m.properties
        });
      }
      if (r && n && m) {
        links.push({
          id: r.identity.toString(),
          source: n.identity.toString(),
          target: m.identity.toString(),
          type: r.type,
          ...r.properties
        });
      }
    });

    return NextResponse.json({
      success: true,
      nodes: Array.from(nodeMap.values()),
      edges: links,
      totalNodes: nodeMap.size,
      totalEdges: links.length,
      isFallback: false
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
