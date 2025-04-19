import { CLASSES } from '../data/classes.js';

export class Actor5e extends Actor {
    prepareData() {
        super.prepareData();
        const actorData = this.data;

        // Make separate methods for each Actor type (character, npc, etc.)
        if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }

    _prepareCharacterData(actorData) {
        // Handle basic character data preparation here
        const data = actorData.data;

        // Initialize abilities
        for (let [key, ability] of Object.entries(data.abilities)) {
            ability.mod = Math.floor((ability.value - 10) / 2);
        }

        // Calculate proficiency bonus based on level
        data.attributes.prof = Math.max(1, Math.floor((data.details.level || 0) / 4) + 2);

        // Calculate hit points
        this._calculateHitPoints(data);

        // Apply class-specific features
        this._applyClassFeatures(data);
    }

    _calculateHitPoints(actorData) {
        const level = actorData.details.level || 1;
        const conMod = actorData.abilities.con.mod || 0;
        const classKey = actorData.details.class?.toLowerCase();
        const classData = CLASSES[classKey];

        if (classData) {
            const hitDice = classData.hitDice;
            const baseHP = parseInt(hitDice.substring(1)) + conMod;
            const levelHP = (level - 1) * (Math.floor(parseInt(hitDice.substring(1)) / 2) + 1 + conMod);

            actorData.attributes.hp.max = baseHP + levelHP;
            if (!actorData.attributes.hp.value) {
                actorData.attributes.hp.value = actorData.attributes.hp.max;
            }
        }
    }

    _applyClassFeatures(actorData) {
        const classKey = actorData.details.class?.toLowerCase();
        const classData = CLASSES[classKey];

        if (classData) {
            // Apply saving throw proficiencies
            actorData.attributes.savingThrows = {};
            for (const ability of classData.savingThrows) {
                actorData.attributes.savingThrows[ability] = {
                    proficient: true,
                    value: actorData.attributes.prof + (actorData.abilities[ability].mod || 0)
                };
            }

            // Apply class features
            actorData.features = classData.features;
        }
    }
} 