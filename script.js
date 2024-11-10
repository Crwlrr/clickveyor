//localStorage.clear()
document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let clickValue = 1;
    let upgradeCost = 10;
    let generatorPassiveIncome = 0;
    let generatorUpgradeCost = 50;
    let efficiencyMultiplier = 1;
    let efficiencyUpgradeCost = 100;
    let handCrankEfficiencyModifier = 1;

    const clickButtonLabel = "Increase Transport";
    const upgradeButtonLabel = "Upgrade Hand Crank";
    const generatorUpgradeButtonLabel = "Upgrade Generator";

    const scoreDisplay = document.getElementById('score');
    const clickButton = document.getElementById('click-button');
    const upgradeButton = document.getElementById('upgrade-button');
    const generatorUpgradeButton = document.getElementById('generator-button');
    const efficiencyUpgradeButton = document.getElementById('multiplier-button');
    const handCrankEfficiencyUpgradeButton = document.getElementById('crank-multiplier-button');

    // Set initial visibility of buttons
    generatorUpgradeButton.style.display = 'none';
    efficiencyUpgradeButton.style.display = 'none';
    handCrankEfficiencyUpgradeButton.style.display = 'none';

    function loadGame() {
        score = parseInt(localStorage.getItem('score')) || 0;
        clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
        upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
        generatorPassiveIncome = parseInt(localStorage.getItem('generatorPassiveIncome')) || 0;
        generatorUpgradeCost = parseInt(localStorage.getItem('generatorUpgradeCost')) || 50;
        efficiencyMultiplier = parseFloat(localStorage.getItem('efficiencyMultiplier')) || 1;
        efficiencyUpgradeCost = parseInt(localStorage.getItem('efficiencyUpgradeCost')) || 100;
        handCrankEfficiencyModifier = parseInt(localStorage.getItem('handCrankEfficiencyModifier')) || 1;
        updateAll();
    }

    function saveGame() {
        localStorage.setItem('score', score);
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('upgradeCost', upgradeCost);
        localStorage.setItem('generatorPassiveIncome', generatorPassiveIncome);
        localStorage.setItem('generatorUpgradeCost', generatorUpgradeCost);
        localStorage.setItem('efficiencyMultiplier', efficiencyMultiplier);
        localStorage.setItem('efficiencyUpgradeCost', efficiencyUpgradeCost);
        localStorage.setItem('handCrankEfficiencyModifier', handCrankEfficiencyModifier);
    }

    function addScore(baseAmount) {
        score += baseAmount * efficiencyMultiplier;
        updateAll();
        saveGame();
    }

    clickButton.addEventListener('click', () => {
        addScore(clickValue * handCrankEfficiencyModifier);
    });

    upgradeButton.addEventListener('click', () => {
        if (score >= upgradeCost) {
            score -= upgradeCost;
            clickValue++;
            upgradeCost = Math.ceil(upgradeCost * 1.1);
            updateAll();
            saveGame();
        }
    });

    generatorUpgradeButton.addEventListener('click', () => {
        if (score >= generatorUpgradeCost) {
            score -= generatorUpgradeCost;
            generatorPassiveIncome++;
            generatorUpgradeCost = Math.ceil(generatorUpgradeCost * 1.2);
            updateAll();
            saveGame();
        }
    });

    setInterval(() => {
        if (generatorPassiveIncome > 0) {
            addScore(generatorPassiveIncome);
        }
    }, 1000);

    efficiencyUpgradeButton.addEventListener('click', () => {
        if (score >= efficiencyUpgradeCost) {
            score -= efficiencyUpgradeCost;
            efficiencyMultiplier += 0.5;
            efficiencyUpgradeCost = Math.ceil(efficiencyUpgradeCost * 1.4);
            updateAll();
            saveGame();
        }
    });
    
    handCrankEfficiencyUpgradeButton.addEventListener('click', () => {
        if (score >= 5000) {
            score -= 5000;
            handCrankEfficiencyModifier = 5;
            handCrankEfficiencyUpgradeButton.style.display = 'none';
            updateAll();
            saveGame();
        }
    });

    function updateAll() {
        scoreDisplay.textContent = score;
        upgradeButton.textContent = `${upgradeButtonLabel} (Cost: ${upgradeCost} Credits)`;
        upgradeButton.disabled = score < upgradeCost;
        generatorUpgradeButton.textContent = `${generatorUpgradeButtonLabel} (Cost: ${generatorUpgradeCost} Credits)`;
        generatorUpgradeButton.disabled = score < generatorUpgradeCost;
        efficiencyUpgradeButton.textContent = `Upgrade Efficiency (Cost: ${efficiencyUpgradeCost} Credits)`;
        efficiencyUpgradeButton.disabled = score < efficiencyUpgradeCost;
        handCrankEfficiencyUpgradeButton.disabled = score < 5000;

        // Show or hide buttons based on progress
        if (upgradeCost > 10) {
            generatorUpgradeButton.style.display = 'block';
        }

        if (generatorUpgradeCost > 50) {
            efficiencyUpgradeButton.style.display = 'block';
        }

        if (efficiencyUpgradeCost > 100, handCrankEfficiencyModifier < 5) {
            handCrankEfficiencyUpgradeButton.style.display = 'block';
        }
    }

    clickButton.textContent = clickButtonLabel;
    loadGame();
});
