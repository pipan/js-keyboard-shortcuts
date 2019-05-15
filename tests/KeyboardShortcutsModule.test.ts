import 'ts-jest';
import { Application } from '@wildebeest/js-modules';
import { KeyboardShortcutsModule } from '../src/KeyboardShortcutsModule';
import { KeyboardShortcutsService } from '../src/KeyboardShortcutsService';

let app: Application = new Application();
app.run([KeyboardShortcutsModule]);

test("register services", () => {
    expect(app.getContainer().get(KeyboardShortcutsService)).toBeInstanceOf(KeyboardShortcutsService);
});