export class FlightGraph {
    private adjList: Map<string, Set<string>>;

    constructor() {
        this.adjList = new Map();
    }

    addEdge(src: string, dest: string) {
        if (!this.adjList.has(src)) this.adjList.set(src, new Set());
        this.adjList.get(src)!.add(dest);
    }

    getPaths(src: string, dest: string, maxHops: number): string[][] {
        const results: string[][] = [];
        const path: string[] = [];

        const dfs = (current: string, hops: number) => {
            if (hops > maxHops) return;
            path.push(current);
            if (current === dest && path.length > 1) {
                results.push([ ...path ]);
                path.pop();
                return;
            }
            const neighbors = this.adjList.get(current) || [];
            for (const neighbor of neighbors) {
                if (!path.includes(neighbor)) dfs(neighbor, hops + 1);
            }
            path.pop();
        };

        dfs(src, 0);
        return results;
    }
}
