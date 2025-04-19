import { registerSystem } from './system.js';

Hooks.once('init', async function () {
    console.log('Custom D&D 5e System | Initializing');
    await registerSystem();
});

Hooks.once('ready', function () {
    console.log('Custom D&D 5e System | Ready');
}); 