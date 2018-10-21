import {
  getBlockchainInfo,
  getBlockList,
} from '../lib/api';

const delay = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));

export default {
  updateBlockchain: () => async (_, { refreshStatus }) => {
    const { blockchain } = await getBlockchainInfo();
    refreshStatus({ blockchain });
  },
  refreshStatus: ({ blockchain }) => () => ({
    blockchain,
  }),
  scheduleStatusUpdate: () => async (_, { updateStatusAndSchedule }) => {
    await delay(15);
    updateStatusAndSchedule();
  },
  updateStatusAndSchedule: () => async (_, { updateBlockchain, scheduleStatusUpdate }) => {
    updateBlockchain();
    scheduleStatusUpdate();
  },
  updateBlocks: () => async (_, { refreshBlocks }) => {
    const { blocks } = await getBlockList();
    refreshBlocks({ blocks });
  },
  refreshBlocks: ({ blocks }) => () => ({
    blocks,
  }),
  scheduleBlocksUpdate: () => async (_, { updateBlocksAndSchedule }) => {
    await delay(15);
    updateBlocksAndSchedule();
  },
  updateBlocksAndSchedule: () => async (_, { updateBlocks, scheduleBlocksUpdate }) => {
    updateBlocks();
    scheduleBlocksUpdate();
  },
};
