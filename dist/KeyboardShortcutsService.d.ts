import { Emitter, EmitterService } from "@wildebeest/common";
export declare class KeyboardShortcutsService {
    protected emitter: Emitter;
    protected shortcuts: any;
    protected shortcutsReverse: any;
    protected combokeys: any;
    constructor(emitterService: EmitterService);
    getEmitter(): Emitter;
    setShortcut(name: string, shortcut: string): void;
    all(): any;
}
