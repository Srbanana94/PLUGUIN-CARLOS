import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NetworkNodeData } from '../types';
import { css } from '@emotion/css';
import { useTheme2 } from '@grafana/ui';

export const NetworkNodeComponent = memo(({ data }: NodeProps<NetworkNodeData>) => {
  const theme = useTheme2();
  
  // A simple status badge for the demonstration
  // In a real plugin, this would be computed by matching data.id with the Grafana DataFrames.
  const isUp = true; 

  const styles = getStyles(theme, isUp);

  return (
    <div className={styles.nodeWrapper}>
      <Handle type="target" position={Position.Top} className={styles.handle} />
      
      <div className={styles.iconContainer}>
        {data.type === 'router' && <span>🌐</span>}
        {data.type === 'switch' && <span>🔀</span>}
        {data.type === 'server' && <span>🖥️</span>}
        {(!data.type) && <span>📦</span>}
        
        <div className={styles.statusBadge} title={isUp ? "UP" : "DOWN"} />
      </div>
      
      <div className={styles.label}>{data.label}</div>

      <Handle type="source" position={Position.Bottom} className={styles.handle} />
    </div>
  );
});

NetworkNodeComponent.displayName = 'NetworkNodeComponent';

const getStyles = (theme: any, isUp: boolean) => ({
  nodeWrapper: css`
    padding: 10px;
    border-radius: 8px;
    background: ${theme.colors.background.secondary};
    border: 1px solid ${theme.colors.border.weak};
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
    box-shadow: ${theme.shadows.z1};
  `,
  iconContainer: css`
    font-size: 24px;
    position: relative;
    margin-bottom: 8px;
  `,
  statusBadge: css`
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${isUp ? theme.colors.success.main : theme.colors.error.main};
    border: 2px solid ${theme.colors.background.secondary};
  `,
  label: css`
    font-size: ${theme.typography.size.sm};
    color: ${theme.colors.text.primary};
    text-align: center;
    font-weight: ${theme.typography.fontWeightMedium};
  `,
  handle: css`
    width: 8px;
    height: 8px;
    background: ${theme.colors.primary.main};
  `,
});
