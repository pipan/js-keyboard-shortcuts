import { injectable, inject } from "inversify";
import { Emitter, EmitterService, Subscriber } from "@wildebeest/common";
import * as Combokeys from 'combokeys';

@injectable()
export class KeyboardShortcutsService
{
    protected emitter: Emitter;
    protected shortcuts: any;
    protected shortcutsReverse: any;
    protected combokeys: any;

    constructor(@inject(EmitterService) emitterService: EmitterService)
    {
        this.emitter = emitterService.createEmitter();
        this.shortcuts = {};
        this.shortcutsReverse = {};
        this.combokeys = new Combokeys(document.body);
    }

    public getEmitter(): Emitter
    {
        return this.emitter;
    }

    public nameShortcut(name: string, shortcut: string): void
    {
        if (!this.shortcuts[name]) {
            this.combokeys.bind(shortcut, (event: KeyboardEvent, handler: any) => {
                if (!this.shortcutsReverse[handler]) {
                    return;
                }
                event.preventDefault();
                this.emitter.emit(this.shortcutsReverse[handler], {
                    event: event,
                    hotkey: handler
                });
            });
        }
        
        this.shortcuts[name] = shortcut;
        this.shortcutsReverse[shortcut] = name;
    }

    public on(name: string, callback: any): Subscriber
    {
        return this.getEmitter().on(name, callback);
    }

    public all(): any
    {
        return this.shortcuts;
    }
}