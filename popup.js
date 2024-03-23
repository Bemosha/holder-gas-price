document.addEventListener('DOMContentLoaded', function () {
    setLocalizedText(); // Вызов функции для установки локализованного текста

    fetch('https://beaconcha.in/api/v1/execution/gasnow')
    .then(response => response.json())
    .then(data => {
        const gasPriceInGwei = data.data.standard / 10**9; // Преобразуем в Gwei
        const ethPriceInUsd = data.data.priceUSD; // Цена ETH в USD

        function calculateTransactionCostInUsd(gasAmount, gasPriceInGwei, ethPriceInUsd) {
            const gasCostInEth = (gasAmount * gasPriceInGwei) / 1e9; // Количество ETH, потраченное на газ
            return gasCostInEth * ethPriceInUsd; // Стоимость в USD
        }

         // Примеры расчёта для разных типов транзакций
         const swapGasAmount = 200000; // Примерное количество газа для Swap
         const swapCostUsd = calculateTransactionCostInUsd(swapGasAmount, gasPriceInGwei, ethPriceInUsd);
         
         const bridgingGasAmount = 300000; // Примерное количество газа для Bridging
         const bridgingCostUsd = calculateTransactionCostInUsd(bridgingGasAmount, gasPriceInGwei, ethPriceInUsd);
         
         const nftSaleGasAmount = 200000; // Примерное количество газа для продажи NFT
         const nftSaleCostUsd = calculateTransactionCostInUsd(nftSaleGasAmount, gasPriceInGwei, ethPriceInUsd);
         
        
        // Здесь ваш код для расчёта и отображения стоимости транзакций...
        // Пример отображения средней цены газа и цены ETH:
        document.getElementById('gasPrice').innerHTML = `
        <p>${chrome.i18n.getMessage("averageGasPrice")}<span class="value">${gasPriceInGwei.toFixed(2)} Gwei</span></p>
        <p>${chrome.i18n.getMessage("ethPrice")}<span class="value">$${ethPriceInUsd.toFixed(2)}</span></p>
        <p>${chrome.i18n.getMessage("swapCost")}<span class="value">$${swapCostUsd.toFixed(2)}</span></p>
        <p>${chrome.i18n.getMessage("bridgingCost")}<span class="value">$${bridgingCostUsd.toFixed(2)}</span></p>
        <p>${chrome.i18n.getMessage("nftSaleCost")}<span class="value">$${nftSaleCostUsd.toFixed(2)}</span></p>
        `;
    })
    .catch(error => {
        console.log(error);
        document.getElementById('gasPrice').textContent = chrome.i18n.getMessage("errorLoadingData");
    });
});

function setLocalizedText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const msgName = el.getAttribute('data-i18n');
        el.textContent = chrome.i18n.getMessage(msgName);
    });

    
}
