import { CLASSES } from '../data/classes.js';

export class Actor5e extends Actor {
    prepareData() {
        super.prepareData();

        // Prepare actor data
        const actorData = this.system;

        // Calculate derived data
        this._prepareDerivedData(actorData);

        // Apply class-specific features
        this._applyClassFeatures(actorData);
    }

    _prepareDerivedData(actorData) {
        // Calculate ability modifiers
        for (let [key, ability] of Object.entries(actorData.abilities)) {
            ability.mod = Math.floor((ability.value - 10) / 2);
        }

        // Calculate proficiency bonus based on level
        actorData.attributes.prof = Math.max(1, Math.floor((actorData.details.level || 0) / 4) + 2);

        // Calculate hit points
        this._calculateHitPoints(actorData);
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