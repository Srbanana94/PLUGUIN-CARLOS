import React, { useState, useCallback, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { NetworkTopologyOptions } from '../types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NetworkNodeComponent } from './NetworkNode';

const nodeTypes = {
  networkNode: NetworkNodeComponent,
};

interface Props extends PanelProps<NetworkTopologyOptions> {}

export function TopologyPanel({ options, data, width, height, onOptionsChange }: Props) {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  // Initialize nodes and edges from options (persisted Grafana config)
  const initialNodes: Node[] = (options.nodes || []).map(n => ({
    id: n.id,
    position: n.position,
    data: n.data,
    type: 'networkNode'
  }));

  const initialEdges: Edge[] = (options.edges || []).map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    animated: true,
  }));

  const [nodes, setNodes] = useState<Node[]>(initialNodes.length ? initialNodes : [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Router A', type: 'router' }, type: 'networkNode' },
    { id: '2', position: { x: 300, y: 100 }, data: { label: 'Switch B', type: 'switch' }, type: 'networkNode' },
  ]);

  const [edges, setEdges] = useState<Edge[]>(initialEdges.length ? initialEdges : [
    { id: 'e1-2', source: '1', target: '2', animated: true }
  ]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Save changes to Grafana Dashboard JSON
  const saveTopology = useCallback(() => {
    onOptionsChange({
      ...options,
      nodes: nodes.map(n => ({ id: n.id, position: n.position, data: n.data })),
      edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target })),
    });
  }, [nodes, edges, options, onOptionsChange]);

  // Optionally trigger save when topology changes (or via a save button)
  useEffect(() => {
    saveTopology();
  }, [nodes, edges]); // Be careful with performance, for large tops you might need debounce.

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color={theme.colors.text.secondary} gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: 'Inter', sans-serif;
      position: relative;
    `,
  };
};
