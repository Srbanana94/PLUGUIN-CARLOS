export interface NetworkNodeData {
  id: string;
  label: string;
  type: string; // 'router', 'switch', 'server'
}

export interface NetworkNode {
  id: string;
  position: { x: number; y: number };
  data: NetworkNodeData;
  type?: string;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
}

export interface NetworkTopologyOptions {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  nodeStatusMetric: string;
  linkTrafficMetric: string;
}
