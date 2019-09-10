class CooldownTimer {
    constructor(length) {
        this.length = length;
        this.currentCooldown = 0;
    }

    set() { this.currentCooldown = this.length; }
    advance(ticks) { this.currentCooldown = Math.max(0, this.currentCooldown - ticks); }
    reset() { this.currentCooldown = 0; }
}

class Ability {
    constructor({ name, min, max, cooldown, length = 3, adrenRequired = 0, adrenChange = 8, affectedByBoosts = true }) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.cooldownTimer = cooldown instanceof CooldownTimer ? cooldown : new CooldownTimer(cooldown);
        this.length = length;
        this.adrenRequired = adrenRequired;
        this.adrenChange = adrenChange;
        this.affectedByBoosts = affectedByBoosts;
        this.keybind = null;
    }

    isReady() { return this.cooldownTimer.currentCooldown === 0; }

    activate() {
        this.cooldownTimer.set();
    }

    toString() {
        return this.name;
    }

    getWeaponDamageRange({ preciseRank = 0, equilibriumRank = 0 }) {
        if (!this.affectedByBoosts) {
            preciseRank = equilibriumRank = 0;
        }
        let preciseMin = this.min + 0.015 * preciseRank * this.max;
        let min = preciseMin + 0.03 * equilibriumRank * (this.max - preciseMin);
        let max = this.max - 0.01 * equilibriumRank * (this.max - preciseMin);
        return { min, max };
    }

    getDamageRange({ base = 1, additiveBoost = 0, multiplicativeBoost = 1, visibleLevelBoost = 0, preciseRank = 0, equilibriumRank = 0 }) {
        if (!this.affectedByBoosts) {
            preciseRank = equilibriumRank = additiveBoost = 0;
            multiplicativeBoost = 1;
            visibleLevelBoost = 0;
        }
        let { min, max } = this.getWeaponDamageRange({ preciseRank, equilibriumRank });
        let abilityDamage = (base + additiveBoost) * multiplicativeBoost;
        return { min: abilityDamage * min + 4 * visibleLevelBoost, max: abilityDamage * max + 8 * visibleLevelBoost };
    }

    getMeanDamage({ base = 1, additiveBoost = 0, multiplicativeBoost = 1, visibleLevelBoost = 0, preciseRank = 0, equilibriumRank = 0, bitingRank = 0, critChance = 0 }) {
        if (this.affectedByBoosts) {
            let { min, max } = this.getDamageRange({ base, additiveBoost, multiplicativeBoost, visibleLevelBoost, preciseRank, equilibriumRank });
            let totalCritChance = critChance + 0.02 * bitingRank;
            return totalCritChance * (0.975 * max + 0.025 * min) + (1 - totalCritChance) * 0.5 * (min + max);
        } else {
            return 0.5 * (this.min + this.max) * base;
        }
    }
}

class BleedAbility extends Ability {
    constructor({ name, min, max, cooldown, adrenRequired = 0, adrenChange = 8 }) {
        super({ name, min, max, cooldown, adrenRequired, adrenChange, affectedByBoosts: false });
    }

    getMeanDamage({ base = 1 }) {
        return 0.5 * (this.min * this.min / this.max + this.max) * base;
    }
}

class MutatedFuryAbility extends Ability {
    activate() {
        super.activate();
        mutatedFuryBuff.activate();
    }
}

// Forced crits only apply to first hit
class MultiHitChanneledAbility extends Ability {
    constructor(args) {
        super(args);
        this.numHits = args.numHits || 4;
    }

    getMeanDamage({ base = 1, additiveBoost = 0, multiplicativeBoost = 1, visibleLevelBoost = 0, preciseRank = 0, equilibriumRank = 0, bitingRank = 0, critChance = 0 }) {
        if (this.affectedByBoosts) {
            let { min, max } = this.getDamageRange({ base, additiveBoost, multiplicativeBoost, visibleLevelBoost, preciseRank, equilibriumRank });
            let totalCritChance = critChance + 0.02 * bitingRank;
            let firstHit = (totalCritChance * (0.975 * max + 0.025 * min) + (1 - totalCritChance) * 0.5 * (min + max)) / this.numHits;
            let restHits = (this.numHits - 1) * (0.02 * bitingRank * (0.975 * max + 0.025 * min) + (1 - 0.02 * bitingRank) * 0.5 * (min + max)) / this.numHits;
            return firstHit + restHits;
        } else {
            return 0.5 * (this.min + this.max) * base;
        }
    }
}

class SimpleBuff {
    constructor(name) {
        this.name = name;
        this.active = false;
        this.multiplier = 1;
    }

    isActive() { return this.active; }
    activate() { this.active = true; }
    reset() { this.active = false; }
    advance() { }
}

class DamageBooster {
    constructor(name, multiplier, duration, affectsBleeds = false) {
        this.name = name;
        this.multiplier = multiplier;
        this.duration = duration;
        this.ticksLeft = 0;
        this.affectsBleeds = affectsBleeds;
    }

    isActive() { return this.ticksLeft > 0; }
    activate() { this.ticksLeft = this.duration; }
    advance(ticks) { this.ticksLeft = Math.max(0, this.ticksLeft - ticks); }
    reset() { this.ticksLeft = 0; }
}

class DamageBoosterAbility extends Ability {
    constructor({ name, damageBooster, cooldown, aaAbilityDamage = magicAaAbilityDamage, adrenRequired = 100, adrenChange = -88 }) {
        super({ name, min: 0, max: damageBooster.multiplier * aaAbilityDamage, cooldown, adrenChange, adrenRequired });

        this.damageBooster = damageBooster;
    }

    activate() {
        super.activate();
        this.damageBooster.activate();
    }
}

let corruptionCooldown = new CooldownTimer(25);
let impactCooldown = new CooldownTimer(25);
let sunMetaCooldown = new CooldownTimer(100);

let sunshineDamageBooster = new DamageBooster("Sunshine", 1.5, 62);
let metamorphosisDamageBooster = new DamageBooster("Metamorphosis", 1.625, 25, true);
let berserkDamageBooster = new DamageBooster("Berserk", 2, 33);
let mutatedFuryBuff = new SimpleBuff("Mutated Fury");

let magicAaAbilityDamage = 1.54;

let chain = new Ability({ name: "Chain", min: 0.2, max: 1, cooldown: 17 }),
    dragonBreath = new Ability({ name: "Dragon Breath", min: 0.376, max: 1.88, cooldown: 17 }),
    corruptionBlast = new Ability({ name: "Corruption Blast", min: 1, max: 3, cooldown: corruptionCooldown, affectedByBoosts: false }),
    sonicWave = new Ability({ name: "Sonic Wave", min: 0.314, max: 1.57, cooldown: 9 }),
    wrack = new Ability({ name: "Wrack", min: 0.188, max: 0.94, cooldown: 5 }),
    combust = new BleedAbility({ name: "Combust", min: 1, max: 1.88, cooldown: 25 }),
    impact = new Ability({ name: "Impact", min: 0.2, max: 1, cooldown: impactCooldown }),
    wildMagic = new Ability({ name: "Wild Magic", min: 1, max: 4.3, cooldown: 33, adrenRequired: 50, adrenChange: -15 }),
    asphyxiate = new MultiHitChanneledAbility({ name: "Asphyxiate", min: 1.504, max: 7.52, cooldown: 33, length: 7, adrenRequired: 50, adrenChange: -15 }),
    deepImpact = new Ability({ name: "Deep Impact", min: 0.4, max: 2, cooldown: impactCooldown, adrenRequired: 50, adrenChange: -15 }),
    tuskasWrath = new Ability({ name: "Tuska's Wrath", min: 0.22, max: 1.1, cooldown: 25 }),
    smokeTendrils = new Ability({ name: "Smoke Tendrils", min: 1.15, max: 5.75, cooldown: 75, length: 7, adrenRequired: 50, adrenChange: -15 }),
    sacrifice = new Ability({ name: "Sacrifice", min: 0.2, max: 1, cooldown: 50 }),
    omnipower = new Ability({ name: "Omnipower", min: 2, max: 4, cooldown: 33, adrenRequired: 100, adrenChange: -100 }),
    detonate = new Ability({ name: "Detonate", min: 1, max: 5.04, cooldown: 50, length: 6, adrenRequired: 50, adrenChange: -13 }),
    sunshine = new DamageBoosterAbility({ name: "Sunshine", damageBooster: sunshineDamageBooster, cooldown: sunMetaCooldown }),
    metamorphosis = new DamageBoosterAbility({ name: "Metamorphosis", damageBooster: metamorphosisDamageBooster, cooldown: sunMetaCooldown, affectsBleeds: true });

let dwAutoAbilityDamage = 0.665;

let decimate = new Ability({ name: "Decimate", min: 0.376, max: 1.88, cooldown: 12 }),
    sever = new Ability({ name: "Sever", min: 0.376, max: 1.88, cooldown: 25 }),
    dismember = new BleedAbility({ name: "Dismember", min: 1.6, max: 3.008, cooldown: 25 }),
    mutatedFury = new MutatedFuryAbility({ name: "Mutated Fury", min: 0.314, max: 1.57, cooldown: 9 }),
    havoc = new Ability({ name: "Havoc", min: 0.314, max: 1.57, cooldown: 17 }),
    slice = new Ability({ name: "Slice", min: 0.3, max: 1.2, cooldown: 5 }),
    walkedSlaughter = new BleedAbility({ name: "Slaughter", min: 3, max: 7.5, cooldown: 50, adrenRequired: 50, adrenChange: -15 }),
    destroy = new MultiHitChanneledAbility({ name: "Destroy", min: 1.504, max: 7.52, cooldown: 33, length: 7, adrenRequired: 50, adrenChange: -15 }),
    assault = new MultiHitChanneledAbility({ name: "Assault", min: 1.752, max: 8.76, cooldown: 50, length: 7, adrenRequired: 50, adrenChange: -15 }),
    bloodTendrils = new Ability({ name: "Blood Tendrils", min: 1.08, max: 5.4, cooldown: 75, adrenRequired: 50, adrenChange: -15, affectedByBoosts: false }),
    berserk = new DamageBoosterAbility({ name: "Berserk", damageBooster: berserkDamageBooster, cooldown: sunMetaCooldown, aaAbilityDamage: dwAutoAbilityDamage });

let magicAbilityList = [chain, dragonBreath, corruptionBlast, sonicWave, wrack, combust, impact, wildMagic, asphyxiate, deepImpact, smokeTendrils, tuskasWrath, sacrifice, omnipower, detonate, sunshine, metamorphosis];
let dwMeleeAbilityList = [decimate, sever, dismember, mutatedFury, havoc, slice, walkedSlaughter, destroy, assault, bloodTendrils, tuskasWrath, sacrifice, berserk];
let magicKeybinds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', 'G', 'H', '$', 'n', 'y', 'Y'];
let meleeKeybinds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '@', 'G', 'H', 'y'];

for (let i = 0; i < magicAbilityList.length; i++) {
    magicAbilityList[i].keybind = magicKeybinds[i];
}

for (let i = 0; i < dwMeleeAbilityList.length; i++) {
    dwMeleeAbilityList[i].keybind = meleeKeybinds[i];
}

class AbilityManager {
    constructor(abilityList = magicAbilityList, abilityDamage = 1993, preciseRank = 4, equilibriumRank = 2, bitingRank = 3, additiveBoost = 0, multiplicativeBoost = 1) {
        this.abilityList = abilityList;
        this.abilityDamage = abilityDamage;
        this.preciseRank = preciseRank;
        this.equilibriumRank = equilibriumRank;
        this.bitingRank = bitingRank;
        this.additiveBoost = additiveBoost;
        this.multiplicativeBoost = multiplicativeBoost;

        this.buffs = [
            sunshineDamageBooster,
            metamorphosisDamageBooster,
            berserkDamageBooster,
            mutatedFuryBuff
        ];

        this.timers = new Set(this.abilityList.map(a => a.cooldownTimer));
        for (let d of this.buffs) {
            this.timers.add(d);
        }

        this.totalDamage = 0;
        this.totalTicks = 0;
        this.adrenaline = 0;
    }

    findAbility(key) {
        for (let a of this.abilityList) {
            if (a.keybind === key) {
                return a;
            }
        }
        return null;
    }

    canCast(ability) {
        return ability.isReady() && this.adrenaline >= ability.adrenRequired;
    }

    cast(ability) {
        if (!this.canCast(ability)) {
            console.log("Cast not allowed");
            return;
        }

        let ticks = ability.length;

        ability.activate();
        for (let t of this.timers) {
            t.advance(ticks);
        }

        this.totalDamage += this.getMeanDamage(ability);
        this.adrenaline = Math.min(100, this.adrenaline + ability.adrenChange);
        this.totalTicks += ticks;
        
        if (ability != mutatedFury && ability != berserk) {
            mutatedFuryBuff.reset();
        }
    }

    getDamageRange(ability) {
        let { min, max } = ability.getDamageRange({
            base: this.abilityDamage,
            preciseRank: this.preciseRank,
            equilibriumRank: this.equilibriumRank,
            additiveBoost: this.additiveBoost,
            multiplicativeBoost: this.multiplicativeBoost
        });

        for (let d of this.buffs) {
            if (d.isActive() && (ability.affectedByBoosts || d.affectsBleeds)) {
                min *= d.multiplier;
                max *= d.multiplier;
            }
        }

        return { min, max };
    }

    getMeanDamage(ability) {
        let damage = ability.getMeanDamage({
            base: this.abilityDamage,
            preciseRank: this.preciseRank,
            equilibriumRank: this.equilibriumRank,
            critChance: 0.02 * this.bitingRank + (mutatedFuryBuff.isActive() ? 0.145 : 0),
            additiveBoost: this.additiveBoost,
            multiplicativeBoost: this.multiplicativeBoost
        });

        for (let d of this.buffs) {
            if (d.isActive() && (ability.affectedByBoosts || d.affectsBleeds)) {
                damage *= d.multiplier;
            }
        }

        return damage;
    }

    getDamagePerTick(ability) {
        return this.getMeanDamage(ability) / ability.length;
    }

    getPotential(ability) {
        if (ability instanceof DamageBoosterAbility) {
            return 100000;
        }

        if (ability.name === "Deep Impact" || ability.name === "Smoke Tendrils") {
            return 0;
        }

        return this.getDamagePerTick(ability) / (1 + ability.adrenRequired / 120);
    }

    getTopAbilities(count = 5) {
        return this.abilityList
            .filter(a => this.canCast(a))
            .sort((a, b) => this.getPotential(b) - this.getPotential(a));
    }

    reset(adrenaline = 0) {
        this.totalDamage = 0;
        this.totalTicks = 0;
        this.adrenaline = adrenaline;

        for (let t of this.timers) {
            t.reset();
        }
    }
}

function processAbility(a, record = true) {
    if (a != null && m.canCast(a)) {
        m.cast(a);
        if (record) {
            abilityInputList.push({
                ability: a,
                ticks: m.totalTicks,
                adrenaline: m.adrenaline,
                totalDamage: m.totalDamage,
                dpm: m.totalDamage / m.totalTicks * 100
            });
        }
    }
}

function processKey(key, record = true) {
    processAbility(m.findAbility(key), record);
}

function processKeys(keys, record = true) {
    for (let c of keys) {
        processKey(c, record);
    }
}

let m = new AbilityManager();
let abilityInputList = [];
let localStorageProps = ["abilityDamage", "preciseRank", "equilibriumRank", "bitingRank", "multiplicativeBoost"];

m.multiplicativeBoost = 1.12;
m.adrenaline = 100;

let vm = new Vue({
    el: "#container",
    data: {
        m,
        abilityInputList,
        autopilotBranching: 3,
        autopilotDepth: 8,
        autopilotPrefix: ""
    },
    mounted() {
        for (let s of localStorageProps) {
            if (localStorage[s]) {
                m[s] = parseFloat(localStorage[s]);
            }
        }
    },
    computed: {
        abilityView: () => {
            return m.abilityList;
        }
    },
    watch: {
        m: {
            handler: () => {
                for (let s of localStorageProps) {
                    localStorage[s] = m[s];
                }
            },
            deep: true
        }
    },
    methods: {
        damageRange: a => {
            let { min, max } = m.getDamageRange(a);
            return min.toFixed(0) + " - " + max.toFixed(0);
        },

        getRowClass: a => {
            return {
                ready: m.canCast(a),
                notReady: !m.canCast(a)
            }
        },

        abilityInputStr: () => {
            return "Ticks\tAbility\tAdren\tDPM\n" + abilityInputList.map(x =>
                x.ticks + "\t"
                + (x.ability instanceof Ability ? x.ability.keybind : x.ability) + "\t"
                + x.adrenaline + "\t"
                + x.dpm).join("\n");
        }
    }
});

$(document).keydown(e => {
    if (!$(e.target).is(':input, [contenteditable]')) {
        processKey(e.key);
    }
});

$("#sendButton").click(e => {
    processKeys($("#abilityInput").val());
});

$("#abilityInput").keyup(e => {
    if (e.keyCode === 13) {
        $("#sendButton").click();
    }
});

$("#resetButton").click(e => {
    m.reset(100);
    abilityInputList.length = 0;
});

$("#autopilot").click(e => {
    const N = vm.autopilotBranching;
    const NUM_ABILITIES = vm.autopilotDepth;

    if (Math.pow(N, NUM_ABILITIES) > 100000) {
        alert("Too high");
        return;
    }

    arr = [[]];
    for (let i = 0; i < NUM_ABILITIES; i++) {
        let newArr = [];
        for (let s of arr) {
            for (let j = 0; j < N; j++) {
                newArr.push(s.concat(j));
            }
        }
        arr = newArr;
    }

    console.log("Done enumerating bit strings");

    for (let i = 0; i < arr.length; i++) {
        let s = arr[i];
        let ss = "";
        m.reset(0);
        processKeys(vm.autopilotPrefix, false);
        for (let j = 0; j < s.length; j++) {
            let top = m.getTopAbilities(N);
            if (s[j] >= top.length) { s[j] = top.length - 1; }
            let a = top[s[j]];
            ss += a.keybind;
            m.cast(a);
        }
        arr[i] = {
            ability: ss,
            ticks: m.totalTicks,
            adrenaline: m.adrenaline,
            dpm: m.totalDamage / m.totalTicks * 100
        }
    }
    arr.sort((a, b) => b.dpm - a.dpm);
    abilityInputList = arr.slice(0, 20);
});
