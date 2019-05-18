import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { KeyboardShortcutsModule } from '../src/KeyboardShortcutsModule';
import { KeyboardShortcutsService } from '../src/KeyboardShortcutsService';

let modifiers: any = {
    'ctrl': 17,
    'shift': 16,
    'alt': 18,
    'meta': 91
};

function createEvent(type: string, keyCode: number, modifiers: any): any
{
    let event: any = document.createEvent('Event');
    event.initEvent(type, true, true);
    event.keyCode = keyCode;
    event.ctrlKey = modifiers.ctrl || false;
    event.shiftKey = modifiers.shift || false;
    event.metaKey = modifiers.meta || false;
    event.altKey = modifiers.alt || false;
    return event;
}

function keyDown(charCode: number, modifiers: any = {}): void
{
    let event: any = createEvent('keydown', charCode, modifiers);
    document.body.dispatchEvent(event);
}

function keyPress(charCode: number, modifiers: any = {}): void
{
    let event: any = createEvent('keypress', charCode, modifiers);
    document.body.dispatchEvent(event);
}

function keyUp(charCode: number, modifiers: any = {}): void
{
    let event: any = createEvent('keyup', charCode, modifiers);
    document.body.dispatchEvent(event);
}

function simulateKeyboard(shortcut: string, modifiers: any = {}): void
{
    if (shortcut.length == 0) {
        return;
    }
    let keys: Array<string> = shortcut.split("+");
    let key: string = keys.shift();
    if (isModifier(key)) {
        modifiers[key] = true;
    }
    keyDown(getKeyCode(key), modifiers);
    if (keys.length == 0 &&  (!modifiers.ctrl && !modifiers.alt)) {
        keyPress(getKeyCode(key), modifiers);
    }
    simulateKeyboard(keys.join("+"), modifiers);
    keyUp(getKeyCode(key), modifiers);
}

function isModifier(key: string): boolean
{
    return modifiers[key];
}

function getKeyCode(key: string): number
{
    if (isModifier(key)) {
        return modifiers[key];
    }
    return key.charCodeAt(0);
}

function simulateKey(keyCode: number, modifiers: any = {}): void
{
    keyDown(keyCode, modifiers);
    keyPress(keyCode, modifiers);
    keyUp(keyCode, modifiers);
}

let keyboardShortcutsService: KeyboardShortcutsService;

beforeEach(() => {
    let app: Application = new Application();
    app.run([KeyboardShortcutsModule]);
    keyboardShortcutsService = app.getContainer().get(KeyboardShortcutsService);
});

test("keyboard create shortcut a", () => {
    let value: number = 0;
    keyboardShortcutsService.on("test", () => {
        value = 1;
    });
    keyboardShortcutsService.nameShortcut("test", "a");
    simulateKeyboard("a");
    expect(value).toEqual(1);
});

test("keyboard create shortcut shift_b", () => {
    let value: number = 0;
    keyboardShortcutsService.on("test", () => {
        value = 1;
    });
    keyboardShortcutsService.nameShortcut("test", "B");
    simulateKeyboard("shift+B");
    expect(value).toEqual(1);
});

test("keyboard create shortcut ctrl_c", () => {
    let value: number = 0;
    keyboardShortcutsService.on("test", () => {
        value = 1;
    });
    keyboardShortcutsService.nameShortcut("test", "ctrl+c");
    simulateKeyboard("ctrl+C");
    expect(value).toEqual(1);
});

test("keyboard create shortcut ctrl_shift_d", () => {
    let value: number = 0;
    keyboardShortcutsService.on("test", () => {
        value = 1;
    });
    keyboardShortcutsService.nameShortcut("test", "ctrl+shift+d");
    simulateKeyboard("ctrl+shift+D");
    expect(value).toEqual(1);
});