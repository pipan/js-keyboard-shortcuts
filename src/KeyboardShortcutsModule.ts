import { Module } from '@wildebeest/js-modules';
import { CommonModule } from '@wildebeest/common';
import { Container } from 'inversify';
import { KeyboardShortcutsService } from './KeyboardShortcutsService';
declare let hotkeys: any;

export class KeyboardShortcutsModule implements Module
{
    getDependencies(): Array<any>
    {
        return [CommonModule];
    }

    register(container: Container): void
    {
        container.bind<KeyboardShortcutsService>(KeyboardShortcutsService).toSelf().inSingletonScope();
    }

    boot(container: Container): void { }
}