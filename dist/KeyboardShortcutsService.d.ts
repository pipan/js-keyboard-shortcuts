import { Emitter, EmitterService, Subscriber } from "@wildebeest/common";
export declare class KeyboardShortcutsService {
    protected emitter: Emitter;
    protected shortcuts: any;
    protected shortcutsReverse: any;
    protected combokeys: any;
    constructor(emitterService: EmitterService);
    getEmitter(): Emitter;
    nameShortcut(name: string, shortcut: string): void;
    on(name: string, callback: any): Subscriber;
    all(): any;
}
