export class CharacterSheet5e extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["custom_dnd5e", "sheet", "actor"],
            template: "templates/actor/character-sheet.html",
            width: 800,
            height: 800,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes" }]
        });
    }

    getData() {
        const data = super.getData();

        // Calculate HP percentage for the health bar
        if (data.system.attributes.hp) {
            data.system.attributes.hp.pct = Math.max(0, (data.system.attributes.hp.value / data.system.attributes.hp.max) * 100);
        }

        // Prepare items
        data.items = this.actor.items.map(item => {
            const itemData = item.toObject();
            return itemData;
        });

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Roll ability checks
        html.find('.ability-score').click(this._onRollAbilityCheck.bind(this));

        // Roll weapon attacks
        html.find('.item-attack').click(this._onRollWeaponAttack.bind(this));

        // Roll damage
        html.find('.item-damage').click(this._onRollWeaponDamage.bind(this));

        // Open item sheet
        html.find('.item').click(this._onItemClick.bind(this));
    }

    async _onRollAbilityCheck(event) {
        event.preventDefault();
        const ability = event.currentTarget.dataset.ability;
        const abilityData = this.actor.system.abilities[ability];
        const roll = new Roll("1d20 + @mod", { mod: abilityData.mod });
        await roll.roll();
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `${this.actor.name} makes a ${ability} check`
        });
    }

    async _onRollWeaponAttack(event) {
        event.preventDefault();
        const itemId = event.currentTarget.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        const roll = new Roll("1d20 + @bonus", { bonus: item.system.attackBonus });
        await roll.roll();
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `${this.actor.name} attacks with ${item.name}`
        });
    }

    async _onRollWeaponDamage(event) {
        event.preventDefault();
        const itemId = event.currentTarget.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        const roll = new Roll(item.system.damage);
        await roll.roll();
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `${this.actor.name} deals damage with ${item.name}`
        });
    }

    async _onItemClick(event) {
        event.preventDefault();
        const itemId = event.currentTarget.dataset.itemId;
        const item = this.actor.items.get(itemId);
        item.sheet.render(true);
    }
} 