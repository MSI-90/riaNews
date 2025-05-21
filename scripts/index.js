import { Path } from "./elemPath.js";
import { ShortInfoCategory } from "./shortInfoCategory.js";
import { WebElement } from "selenium-webdriver";
import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

// настройки браузера
const options = new chrome.Options().addArguments('--headless').setPageLoadStrategy('normal');

// инициализация веб-драйвера
const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

async function performBrowserActions (siteUrl) {
    try {
        if (typeof siteUrl !== "string")
            return;

        const pathInstance = new Path().createElem();
        const pictureFromCategoryHyperlink = [];
        const titleItemsFromCategoryHyperlink = [];
        const map1 = new Map();
        const map2 = new Map();
        await driver.get( siteUrl );
        await driver.findElement(pathInstance.category).click();
        // Получаем коллекции элементов
        const images = await driver.findElements(pathInstance.hyperlinkItemCategoryImage);
        const titles = await driver.findElements(pathInstance.hyperlinkItemCategory);

        // Заполняем массивы
        pictureFromCategoryHyperlink.push(...images);
        titleItemsFromCategoryHyperlink.push(...titles);

        if (titleItemsFromCategoryHyperlink.length > 0)
        {
            let index = 1;
            for (let item of titleItemsFromCategoryHyperlink)
            {
                const shortInfoCategory = new ShortInfoCategory(
                    await item?.getAttribute("href"),
                    await item?.getText(),
                    await pictureFromCategoryHyperlink?.[index - 1]?.getAttribute("srcset")
                );
                map1.set(index, shortInfoCategory); // Добавляем с ключом
                map2.set(index,
                    `${await item.getAttribute("href")}\n` +
                    `${await item.getText()}\n` +
                    `${await pictureFromCategoryHyperlink[index - 1]?.getAttribute("srcset")}\n`
                );
                index++;
            }
        }

        console.log(`Новостей на странице: ${map1.size}`);
        for (const [key, value] of map1) {
            console.log(key, value);
        }

    } catch (error) {
        console.error( 'Не удалось выполнить действия браузера:' , error);
    } finally {
        await driver.quit();
    }
}

performBrowserActions('https://ria.ru/');