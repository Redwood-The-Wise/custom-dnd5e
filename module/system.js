import { Actor5e } from './actor/actor.js';
import { Item5e } from './item/item.js';

export async function registerSystem() {
    // Register system settings
    game.settings.register('custom_dnd5e', 'systemMigrationVersion', {
        name: 'System Migration Version',
        scope: 'world',
        config: false,
        type: String,
        default: '0.0.1'
    });

    // Register document classes
    CONFIG.Actor.documentClass = Actor5e;
    CONFIG.Item.documentClass = Item5e;

    // Register system-specific settings
    game.settings.register('custom_dnd5e', 'useAdvantageDisadvantage', {
        name: 'Use Advantage/Disadvantage',
        hint: 'Enable the advantage/disadvantage system for rolls',
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });
} 