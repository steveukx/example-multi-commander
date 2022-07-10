import { Emitter } from './emitter';
import type { Command } from 'commander';

export type GlobalEvents = {
    initialise(command: Command): Promise<void>;
    initialiseSearch(command: Command): Promise<void>;
}

const shared = process as { globalEvents?: Emitter<GlobalEvents> };

shared.globalEvents = shared.globalEvents || new Emitter();

export function globalEvents() {
    return shared.globalEvents!;
}