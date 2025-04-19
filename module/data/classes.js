export const CLASSES = {
    barbarian: {
        name: "Barbarian",
        hitDice: "d12",
        primaryAbility: "str",
        savingThrows: ["str", "con"],
        features: {
            rage: {
                name: "Rage",
                level: 1,
                description: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action."
            },
            unarmoredDefense: {
                name: "Unarmored Defense",
                level: 1,
                description: "While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier."
            }
        }
    },
    fighter: {
        name: "Fighter",
        hitDice: "d10",
        primaryAbility: "str",
        savingThrows: ["str", "con"],
        features: {
            fightingStyle: {
                name: "Fighting Style",
                level: 1,
                description: "You adopt a particular style of fighting as your specialty."
            },
            secondWind: {
                name: "Second Wind",
                level: 1,
                description: "You have a limited well of stamina that you can draw on to protect yourself from harm."
            }
        }
    },
    wizard: {
        name: "Wizard",
        hitDice: "d6",
        primaryAbility: "int",
        savingThrows: ["int", "wis"],
        features: {
            arcaneRecovery: {
                name: "Arcane Recovery",
                level: 1,
                description: "You have learned to regain some of your magical energy by studying your spellbook."
            },
            spellcasting: {
                name: "Spellcasting",
                level: 1,
                description: "As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power."
            }
        }
    }
}; 