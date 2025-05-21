import { By } from 'selenium-webdriver';

export class Path {
    constructor(category, hyperlinkItemCategoryImage, hyperlinkItemCategory) {
        this.category = category;
        this.hyperlinkItemCategoryImage = hyperlinkItemCategoryImage;
        this.hyperlinkItemCategory = hyperlinkItemCategory;
    }

    createElem() {
        return new this.constructor(By.xpath("//div[@class='cell cell-extension']//div[@class='the-in-carousel__stage']//div[@class='cell-extension__item m-with-title'][position()=1]"),
            By.xpath("//div[@class='list list-tags']//div[@class='list-item']//div[@class='list-item__content']//a[1]//picture//source[@media='(min-width: 1160px)']"),
            By.xpath("//div[@class='list list-tags']//div[@class='list-item']//div[@class='list-item__content']//a[2]"))
    }
}