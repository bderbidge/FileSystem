import { FileSystemObject, FileTypes } from "./FileSystemObject";
import { Directory } from "./Directory";


export class Zip extends FileSystemObject{

    private fileSystemObject: FileSystemObject;

    constructor(name: string, parent: Directory, fileSystemObject: FileSystemObject ) {
        super(name, parent, FileTypes.Zip )
        this.fileSystemObject = fileSystemObject;
    }

    public getSize() : number {
        return this.fileSystemObject.getSize();
    }

    public copy() : FileSystemObject {
        const copiedObject = this.fileSystemObject.copy();
        return new Zip(this.getName(), this.getParent(), copiedObject);
    }

    public unzip() : boolean{
        let itemcopy = this.fileSystemObject.copy();
        itemcopy.setParent(this.getParent());
        this.getParent().addEntry(itemcopy);   
        return true;
    }

    public zip(): boolean{
        return false;
    }
}