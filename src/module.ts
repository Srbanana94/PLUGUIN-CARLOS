import { PanelPlugin } from '@grafana/data';
import { NetworkTopologyOptions } from './types';
import { TopologyPanel } from './components/TopologyPanel';

export const plugin = new PanelPlugin<NetworkTopologyOptions>(TopologyPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'nodeStatusMetric',
      name: 'Node Status Metric',
      description: 'The name of the query/field to use for determining node status (UP/DOWN)',
      defaultValue: 'status',
    })
    .addTextInput({
      path: 'linkTrafficMetric',
      name: 'Link Traffic Metric',
      description: 'The name of the query/field to use for link utilization/traffic',
      defaultValue: 'traffic',
    });
});
