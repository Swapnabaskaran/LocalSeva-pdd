const logger = require('./logger');

class Gestures {
    static async swipeDown(driver) {
        logger.info('Swiping down...');
        const { width, height } = await driver.getWindowRect();
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.8) },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 1000, origin: 'viewport', x: Math.floor(width / 2), y: Math.floor(height * 0.2) },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    }

    static async scrollUntilVisible(driver, locator, maxSwipes = 5) {
        logger.info(`Scrolling to find element: ${locator}`);
        for (let i = 0; i < maxSwipes; i++) {
            const el = await driver.$(locator);
            if (await el.isDisplayed()) {
                return true;
            }
            await this.swipeDown(driver);
        }
        throw new Error(`Element ${locator} not found after ${maxSwipes} swipes`);
    }

    static async tap(driver, x, y) {
        logger.info(`Tapping at coordinates: x=${x}, y=${y}`);
        await driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x, y },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
    }
}

module.exports = Gestures;
