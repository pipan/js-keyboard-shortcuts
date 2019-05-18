# Keyboadr Shortcuts Module

Add keyboard shortcuts to your application

## Installation

```sh
npm install --save @wildebeest/keyboard-shortcuts
```

## Requirements

It's usefull to know these libraries:

* inversify
* @wildebeest/js-modules

## Usage

### Create Application

```ts
let app: Application();
app.run([KeyboardShortcutsModule]);
```

### Name your shortcut

```ts
let keyboardShortcutsService = app.getContainer().get(KeyboardShortcutsService);
keyboardShortcutsService.nameShortcuts("open file", "ctrl+o");
```

### Listen for a shortcut to be pressed

```ts
keyboardShortcutsService.on("open file", (event: any) => {
    // do something
});
```