import LisItems from "./ListItem";

interface List{
    list: LisItems[],
    load(): void,
    save(): void,
    ClearLiist(): void,
    addItem(itemObj: LisItems): void,
    remooveItem(id: string): void
}

export default class FullList implements List{
    static instance: FullList = new FullList();

    private constructor(private _list: LisItems[] = []) {}

    get list(): LisItems[] {
        return this._list;
    }

    save(): void{
        localStorage.setItem("myList", JSON.stringify(this._list));
    }

    ClearLiist(): void {
        this._list = [];
        this.save()
    }

}