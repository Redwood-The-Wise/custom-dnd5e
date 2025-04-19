export class Item5e extends Item {
    prepareData() {
        super.prepareData();

        // Prepare item data
        const itemData = this.system;

        // Calculate derived data
        this._prepareDerivedData(itemData);
    }

    _prepareDerivedData(itemData) {
        // Calculate attack bonus for weapons
        if (itemData.type === 'weapon') {
            const actor = this.actor;
            if (actor) {
                const ability = itemData.ability || 'str';
                const prof = actor.system.attributes.prof || 0;
                const abilityMod = actor.system.abilities[ability].mod || 0;
                itemData.attackBonus = prof + abilityMod;
            }
        }
    }
} 