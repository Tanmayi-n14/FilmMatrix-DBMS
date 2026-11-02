import neo4j, { Driver, Session } from 'neo4j-driver';

let driver: Driver | null = null;

export function getNeo4jDriver(): Driver {
  if (!driver) {
    const uri = process.env.NEO4J_URI || 'neo4j+s://d2249163.databases.neo4j.io';
    const user = process.env.NEO4J_USERNAME || 'neo4j';
    const password = process.env.NEO4J_PASSWORD || 'hBsbfL8LaIU4B2S-hqW2v8Hy-1xxzxaqmzTSNhxvIzI';

    driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
      maxConnectionPoolSize: 50,
      connectionTimeout: 5000,
    });
  }
  return driver;
}

// Complete In-Memory Graph Dataset for instantaneous fallback / zero-latency demonstrations
export const FALLBACK_GRAPH = {
  nodes: [
    // Directors
    { id: 'dir_1', label: 'Christopher Nolan', type: 'Director', nationality: 'British-American', birth_year: 1970 },
    { id: 'dir_2', label: 'Denis Villeneuve', type: 'Director', nationality: 'Canadian', birth_year: 1967 },
    { id: 'dir_3', label: 'Greta Gerwig', type: 'Director', nationality: 'American', birth_year: 1983 },
    { id: 'dir_4', label: 'James Cameron', type: 'Director', nationality: 'Canadian', birth_year: 1954 },
    { id: 'dir_5', label: 'Martin Scorsese', type: 'Director', nationality: 'American', birth_year: 1942 },
    { id: 'dir_6', label: 'Lana Wachowski', type: 'Director', nationality: 'American', birth_year: 1965 },

    // Movies
    { id: 'mov_1', label: 'Oppenheimer', type: 'Movie', release_year: 2023, box_office: 957000000 },
    { id: 'mov_2', label: 'Inception', type: 'Movie', release_year: 2010, box_office: 836800000 },
    { id: 'mov_3', label: 'Interstellar', type: 'Movie', release_year: 2014, box_office: 701729206 },
    { id: 'mov_4', label: 'The Dark Knight', type: 'Movie', release_year: 2008, box_office: 1006234167 },
    { id: 'mov_5', label: 'Dune: Part Two', type: 'Movie', release_year: 2024, box_office: 711844358 },
    { id: 'mov_6', label: 'Barbie', type: 'Movie', release_year: 2023, box_office: 1445638421 },
    { id: 'mov_7', label: 'Avatar: The Way of Water', type: 'Movie', release_year: 2022, box_office: 2320250281 },
    { id: 'mov_8', label: 'The Matrix Resurrections', type: 'Movie', release_year: 2021, box_office: 159200000 },
    { id: 'mov_9', label: 'Tenet', type: 'Movie', release_year: 2020, box_office: 365304105 },
    { id: 'mov_10', label: 'Killers of the Flower Moon', type: 'Movie', release_year: 2023, box_office: 157000000 },
    { id: 'mov_11', label: 'The Wolf of Wall Street', type: 'Movie', release_year: 2013, box_office: 406900000 },
    { id: 'mov_12', label: 'The Fall Guy', type: 'Movie', release_year: 2024, box_office: 180400000 },
    { id: 'mov_13', label: 'A Scanner Darkly', type: 'Movie', release_year: 2006, box_office: 7659918 },

    // Actors
    { id: 'act_1', label: 'Cillian Murphy', type: 'Actor', nationality: 'Irish', birth_year: 1976, oscar_wins: 1 },
    { id: 'act_2', label: 'Robert Downey Jr.', type: 'Actor', nationality: 'American', birth_year: 1965, oscar_wins: 1 },
    { id: 'act_3', label: 'Emily Blunt', type: 'Actor', nationality: 'British', birth_year: 1983, oscar_wins: 0 },
    { id: 'act_4', label: 'Matt Damon', type: 'Actor', nationality: 'American', birth_year: 1970, oscar_wins: 1 },
    { id: 'act_5', label: 'Florence Pugh', type: 'Actor', nationality: 'British', birth_year: 1996, oscar_wins: 0 },
    { id: 'act_6', label: 'Leonardo DiCaprio', type: 'Actor', nationality: 'American', birth_year: 1974, oscar_wins: 1 },
    { id: 'act_7', label: 'Joseph Gordon-Levitt', type: 'Actor', nationality: 'American', birth_year: 1981, oscar_wins: 0 },
    { id: 'act_8', label: 'Elliot Page', type: 'Actor', nationality: 'Canadian', birth_year: 1987, oscar_wins: 0 },
    { id: 'act_9', label: 'Tom Hardy', type: 'Actor', nationality: 'British', birth_year: 1977, oscar_wins: 0 },
    { id: 'act_10', label: 'Christian Bale', type: 'Actor', nationality: 'British', birth_year: 1974, oscar_wins: 1 },
    { id: 'act_11', label: 'Heath Ledger', type: 'Actor', nationality: 'Australian', birth_year: 1979, oscar_wins: 1 },
    { id: 'act_12', label: 'Michael Caine', type: 'Actor', nationality: 'British', birth_year: 1933, oscar_wins: 2 },
    { id: 'act_13', label: 'Matthew McConaughey', type: 'Actor', nationality: 'American', birth_year: 1969, oscar_wins: 1 },
    { id: 'act_14', label: 'Anne Hathaway', type: 'Actor', nationality: 'American', birth_year: 1982, oscar_wins: 1 },
    { id: 'act_15', label: 'Timothée Chalamet', type: 'Actor', nationality: 'American-French', birth_year: 1995, oscar_wins: 0 },
    { id: 'act_16', label: 'Zendaya', type: 'Actor', nationality: 'American', birth_year: 1996, oscar_wins: 0 },
    { id: 'act_17', label: 'Margot Robbie', type: 'Actor', nationality: 'Australian', birth_year: 1990, oscar_wins: 0 },
    { id: 'act_18', label: 'Ryan Gosling', type: 'Actor', nationality: 'Canadian', birth_year: 1980, oscar_wins: 0 },
    { id: 'act_19', label: 'Keanu Reeves', type: 'Actor', nationality: 'Canadian', birth_year: 1964, oscar_wins: 0 },
    { id: 'act_20', label: 'Carrie-Anne Moss', type: 'Actor', nationality: 'Canadian', birth_year: 1967, oscar_wins: 0 },

    // Genres
    { id: 'gen_1', label: 'Sci-Fi', type: 'Genre' },
    { id: 'gen_2', label: 'Drama', type: 'Genre' },
    { id: 'gen_3', label: 'Action', type: 'Genre' },
    { id: 'gen_4', label: 'Adventure', type: 'Genre' },
    { id: 'gen_5', label: 'Comedy', type: 'Genre' },
    { id: 'gen_6', label: 'Crime', type: 'Genre' },
    { id: 'gen_7', label: 'Biography', type: 'Genre' }
  ],
  edges: [
    // Directorial Edges
    { id: 'e1', source: 'dir_1', target: 'mov_1', type: 'DIRECTED' },
    { id: 'e2', source: 'dir_1', target: 'mov_2', type: 'DIRECTED' },
    { id: 'e3', source: 'dir_1', target: 'mov_3', type: 'DIRECTED' },
    { id: 'e4', source: 'dir_1', target: 'mov_4', type: 'DIRECTED' },
    { id: 'e5', source: 'dir_1', target: 'mov_9', type: 'DIRECTED' },
    { id: 'e6', source: 'dir_2', target: 'mov_5', type: 'DIRECTED' },
    { id: 'e7', source: 'dir_3', target: 'mov_6', type: 'DIRECTED' },
    { id: 'e8', source: 'dir_4', target: 'mov_7', type: 'DIRECTED' },
    { id: 'e9', source: 'dir_5', target: 'mov_10', type: 'DIRECTED' },
    { id: 'e10', source: 'dir_6', target: 'mov_8', type: 'DIRECTED' },

    // Genre Edges
    { id: 'g1', source: 'mov_1', target: 'gen_7', type: 'BELONGS_TO_GENRE' },
    { id: 'g2', source: 'mov_1', target: 'gen_2', type: 'BELONGS_TO_GENRE' },
    { id: 'g3', source: 'mov_2', target: 'gen_1', type: 'BELONGS_TO_GENRE' },
    { id: 'g4', source: 'mov_2', target: 'gen_3', type: 'BELONGS_TO_GENRE' },
    { id: 'g5', source: 'mov_3', target: 'gen_1', type: 'BELONGS_TO_GENRE' },
    { id: 'g6', source: 'mov_3', target: 'gen_4', type: 'BELONGS_TO_GENRE' },
    { id: 'g7', source: 'mov_4', target: 'gen_3', type: 'BELONGS_TO_GENRE' },
    { id: 'g8', source: 'mov_4', target: 'gen_6', type: 'BELONGS_TO_GENRE' },
    { id: 'g9', source: 'mov_5', target: 'gen_1', type: 'BELONGS_TO_GENRE' },
    { id: 'g10', source: 'mov_6', target: 'gen_5', type: 'BELONGS_TO_GENRE' },

    // ACTED_IN Edges with properties
    { id: 'a1', source: 'act_1', target: 'mov_1', type: 'ACTED_IN', role: 'J. Robert Oppenheimer', order: 1 },
    { id: 'a2', source: 'act_2', target: 'mov_1', type: 'ACTED_IN', role: 'Lewis Strauss', order: 2 },
    { id: 'a3', source: 'act_3', target: 'mov_1', type: 'ACTED_IN', role: 'Katherine Oppenheimer', order: 3 },
    { id: 'a4', source: 'act_4', target: 'mov_1', type: 'ACTED_IN', role: 'Leslie Groves', order: 4 },
    { id: 'a5', source: 'act_5', target: 'mov_1', type: 'ACTED_IN', role: 'Jean Tatlock', order: 5 },

    { id: 'a6', source: 'act_6', target: 'mov_2', type: 'ACTED_IN', role: 'Dom Cobb', order: 1 },
    { id: 'a7', source: 'act_7', target: 'mov_2', type: 'ACTED_IN', role: 'Arthur', order: 2 },
    { id: 'a8', source: 'act_8', target: 'mov_2', type: 'ACTED_IN', role: 'Ariadne', order: 3 },
    { id: 'a9', source: 'act_9', target: 'mov_2', type: 'ACTED_IN', role: 'Eames', order: 4 },
    { id: 'a10', source: 'act_1', target: 'mov_2', type: 'ACTED_IN', role: 'Robert Fischer', order: 5 },
    { id: 'a11', source: 'act_12', target: 'mov_2', type: 'ACTED_IN', role: 'Prof. Stephen Miles', order: 6 },

    { id: 'a12', source: 'act_10', target: 'mov_4', type: 'ACTED_IN', role: 'Bruce Wayne / Batman', order: 1 },
    { id: 'a13', source: 'act_11', target: 'mov_4', type: 'ACTED_IN', role: 'Joker', order: 2 },
    { id: 'a14', source: 'act_12', target: 'mov_4', type: 'ACTED_IN', role: 'Alfred Pennyworth', order: 3 },
    { id: 'a15', source: 'act_1', target: 'mov_4', type: 'ACTED_IN', role: 'Scarecrow', order: 4 },

    { id: 'a16', source: 'act_13', target: 'mov_3', type: 'ACTED_IN', role: 'Cooper', order: 1 },
    { id: 'a17', source: 'act_14', target: 'mov_3', type: 'ACTED_IN', role: 'Brand', order: 2 },
    { id: 'a18', source: 'act_4', target: 'mov_3', type: 'ACTED_IN', role: 'Dr. Mann', order: 3 },
    { id: 'a19', source: 'act_12', target: 'mov_3', type: 'ACTED_IN', role: 'Prof. Brand', order: 4 },
    { id: 'a20', source: 'act_15', target: 'mov_3', type: 'ACTED_IN', role: 'Young Tom', order: 5 },

    { id: 'a21', source: 'act_15', target: 'mov_5', type: 'ACTED_IN', role: 'Paul Atreides', order: 1 },
    { id: 'a22', source: 'act_16', target: 'mov_5', type: 'ACTED_IN', role: 'Chani', order: 2 },
    { id: 'a23', source: 'act_5', target: 'mov_5', type: 'ACTED_IN', role: 'Princess Irulan', order: 3 },

    { id: 'a24', source: 'act_17', target: 'mov_6', type: 'ACTED_IN', role: 'Barbie', order: 1 },
    { id: 'a25', source: 'act_18', target: 'mov_6', type: 'ACTED_IN', role: 'Ken', order: 2 },

    { id: 'a26', source: 'act_19', target: 'mov_8', type: 'ACTED_IN', role: 'Neo', order: 1 },
    { id: 'a27', source: 'act_20', target: 'mov_8', type: 'ACTED_IN', role: 'Trinity', order: 2 },

    { id: 'a28', source: 'act_6', target: 'mov_10', type: 'ACTED_IN', role: 'Ernest Burkhart', order: 1 },
    { id: 'a29', source: 'act_6', target: 'mov_11', type: 'ACTED_IN', role: 'Jordan Belfort', order: 1 },
    { id: 'a30', source: 'act_17', target: 'mov_11', type: 'ACTED_IN', role: 'Naomi Lapaglia', order: 2 },
    { id: 'a31', source: 'act_18', target: 'mov_12', type: 'ACTED_IN', role: 'Colt Seavers', order: 1 },
    { id: 'a32', source: 'act_3', target: 'mov_12', type: 'ACTED_IN', role: 'Jody Moreno', order: 2 },
    { id: 'a33', source: 'act_19', target: 'mov_13', type: 'ACTED_IN', role: 'Bob Arctor', order: 1 },
    { id: 'a34', source: 'act_2', target: 'mov_13', type: 'ACTED_IN', role: 'James Barris', order: 2 },

    // CO_STARRED_WITH inferred collaborations
    { id: 'cs1', source: 'act_1', target: 'act_12', type: 'CO_STARRED_WITH', movie_count: 3 }, // Murphy & Caine (Inception, TDK, Batman)
    { id: 'cs2', source: 'act_1', target: 'act_4', type: 'CO_STARRED_WITH', movie_count: 1 }, // Murphy & Damon (Oppenheimer)
    { id: 'cs3', source: 'act_1', target: 'act_6', type: 'CO_STARRED_WITH', movie_count: 1 }, // Murphy & DiCaprio (Inception)
    { id: 'cs4', source: 'act_4', target: 'act_12', type: 'CO_STARRED_WITH', movie_count: 1 }, // Damon & Caine (Interstellar)
    { id: 'cs5', source: 'act_4', target: 'act_15', type: 'CO_STARRED_WITH', movie_count: 1 }, // Damon & Chalamet (Interstellar)
    { id: 'cs6', source: 'act_15', target: 'act_5', type: 'CO_STARRED_WITH', movie_count: 1 }, // Chalamet & Pugh (Dune: Part Two)
    { id: 'cs7', source: 'act_1', target: 'act_5', type: 'CO_STARRED_WITH', movie_count: 1 }, // Murphy & Pugh (Oppenheimer)
    { id: 'cs8', source: 'act_10', target: 'act_12', type: 'CO_STARRED_WITH', movie_count: 1 }, // Bale & Caine (TDK)
    { id: 'cs9', source: 'act_10', target: 'act_11', type: 'CO_STARRED_WITH', movie_count: 1 }, // Bale & Ledger (TDK)
    { id: 'cs10', source: 'act_17', target: 'act_18', type: 'CO_STARRED_WITH', movie_count: 1 }, // Robbie & Gosling (Barbie)
    { id: 'cs11', source: 'act_19', target: 'act_20', type: 'CO_STARRED_WITH', movie_count: 1 }, // Reeves & Moss (Matrix)
    { id: 'cs12', source: 'act_6', target: 'act_17', type: 'CO_STARRED_WITH', movie_count: 1 }, // DiCaprio & Robbie (Wolf of Wall Street)
    { id: 'cs13', source: 'act_18', target: 'act_3', type: 'CO_STARRED_WITH', movie_count: 1 },  // Gosling & Blunt (The Fall Guy)
    { id: 'cs14', source: 'act_19', target: 'act_2', type: 'CO_STARRED_WITH', movie_count: 1 }   // Reeves & Downey Jr (A Scanner Darkly)
  ]
};

export async function runCypher<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<{ records: T[]; isFallback: boolean; error?: string }> {
  try {
    const d = getNeo4jDriver();
    const session = d.session();
    try {
      const result = await session.run(query, params);
      const records = result.records.map(r => r.toObject() as T);
      return { records, isFallback: false };
    } finally {
      await session.close();
    }
  } catch (err: any) {
    console.warn(`[Neo4j Notice] Remote Aura / Bolt unreachable (${err.message}). Using local embedded graph dataset.`);
    const fallbackRecords = executeCypherFallback<T>(query, params);
    return { records: fallbackRecords, isFallback: true, error: err.message };
  }
}

// Emulate Graph Cypher queries in memory for presentation reliability
function executeCypherFallback<T>(query: string, params: Record<string, any>): T[] {
  const q = query.trim();

  // Shortest path between two actors
  if (q.includes('shortestPath') || params.actor1 || params.actor2) {
    const act1 = params.actor1 || 'Leonardo DiCaprio';
    const act2 = params.actor2 || 'Timothée Chalamet';
    const path = findShortestPath(act1, act2);
    return [{ path }] as unknown as T[];
  }

  // Top actor collaborations
  if (q.includes('CO_STARRED_WITH')) {
    const collaborations = FALLBACK_GRAPH.edges
      .filter(e => e.type === 'CO_STARRED_WITH')
      .map(e => {
        const actor1 = FALLBACK_GRAPH.nodes.find(n => n.id === e.source)?.label;
        const actor2 = FALLBACK_GRAPH.nodes.find(n => n.id === e.target)?.label;
        return {
          actor1,
          actor2,
          movie_count: e.movie_count
        };
      })
      .sort((a, b) => (b.movie_count || 0) - (a.movie_count || 0));

    return collaborations as unknown as T[];
  }

  // Director ensemble casting
  if (q.includes('DIRECTED')) {
    const dir = params.director || 'Christopher Nolan';
    const dirNode = FALLBACK_GRAPH.nodes.find(n => n.label.toLowerCase() === dir.toLowerCase());
    if (!dirNode) return [] as T[];

    const directedMovieIds = FALLBACK_GRAPH.edges
      .filter(e => e.source === dirNode.id && e.type === 'DIRECTED')
      .map(e => e.target);

    const actorCounts: Record<string, number> = {};
    FALLBACK_GRAPH.edges
      .filter(e => directedMovieIds.includes(e.target) && e.type === 'ACTED_IN')
      .forEach(e => {
        const actorNode = FALLBACK_GRAPH.nodes.find(n => n.id === e.source);
        if (actorNode) {
          actorCounts[actorNode.label] = (actorCounts[actorNode.label] || 0) + 1;
        }
      });

    const result = Object.entries(actorCounts).map(([name, count]) => ({
      actor: name,
      films_together: count
    })).sort((a, b) => b.films_together - a.films_together);

    return result as unknown as T[];
  }

  return [] as T[];
}

// Breadth-first Search for Actor Shortest Path
export function findShortestPath(actorName1: string, actorName2: string) {
  const norm1 = (actorName1 || '').trim().toLowerCase();
  const norm2 = (actorName2 || '').trim().toLowerCase();

  const node1 = FALLBACK_GRAPH.nodes.find(n => n.type === 'Actor' && n.label.toLowerCase() === norm1);
  const node2 = FALLBACK_GRAPH.nodes.find(n => n.type === 'Actor' && n.label.toLowerCase() === norm2);

  if (!node1 || !node2) {
    return {
      found: false,
      degrees: -1,
      degrees_of_separation: -1,
      path: [],
      path_nodes: [],
      hops: [],
      message: `One or both actors not found in graph database (${actorName1}, ${actorName2})`
    };
  }

  if (node1.id === node2.id) {
    return {
      found: true,
      degrees: 0,
      degrees_of_separation: 0,
      path: [node1.label],
      path_nodes: [node1.label],
      hops: [],
      message: 'Source and destination actor are identical (0 degrees of separation).'
    };
  }

  // Adjacency list across ACTED_IN movies
  const adj = new Map<string, Array<{ neighborId: string; viaMovie: string }>>();
  FALLBACK_GRAPH.nodes.filter(n => n.type === 'Actor').forEach(n => adj.set(n.id, []));

  FALLBACK_GRAPH.nodes.filter(n => n.type === 'Movie').forEach(movie => {
    const cast = FALLBACK_GRAPH.edges
      .filter(e => e.target === movie.id && e.type === 'ACTED_IN')
      .map(e => e.source);

    for (let i = 0; i < cast.length; i++) {
      for (let j = i + 1; j < cast.length; j++) {
        const a1 = cast[i];
        const a2 = cast[j];
        adj.get(a1)?.push({ neighborId: a2, viaMovie: movie.label });
        adj.get(a2)?.push({ neighborId: a1, viaMovie: movie.label });
      }
    }
  });

  const queue: Array<{ currentId: string; path: Array<{ name: string; movie?: string }> }> = [
    { currentId: node1.id, path: [{ name: node1.label }] }
  ];
  const visited = new Set<string>([node1.id]);

  while (queue.length > 0) {
    const { currentId, path } = queue.shift()!;

    if (currentId === node2.id) {
      const degrees = path.length - 1;
      const path_nodes: string[] = [];
      const hops: Array<{ from: string; movie: string; to: string }> = [];

      for (let i = 0; i < path.length; i++) {
        path_nodes.push(path[i].name);
        if (i < path.length - 1 && path[i + 1].movie) {
          path_nodes.push(path[i + 1].movie!);
          hops.push({
            from: path[i].name,
            movie: path[i + 1].movie!,
            to: path[i + 1].name
          });
        }
      }

      return {
        found: true,
        degrees,
        degrees_of_separation: degrees,
        path: path.map(p => p.name),
        path_nodes,
        hops
      };
    }

    const neighbors = adj.get(currentId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.neighborId)) {
        visited.add(neighbor.neighborId);
        const neighborNode = FALLBACK_GRAPH.nodes.find(n => n.id === neighbor.neighborId);
        queue.push({
          currentId: neighbor.neighborId,
          path: [...path, { name: neighborNode?.label || 'Unknown', movie: neighbor.viaMovie }]
        });
      }
    }
  }

  return {
    found: false,
    degrees: -1,
    degrees_of_separation: -1,
    path: [],
    path_nodes: [],
    hops: [],
    message: `No connected film path found between ${actorName1} and ${actorName2}`
  };
}

