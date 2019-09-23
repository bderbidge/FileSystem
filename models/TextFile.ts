import { FileSystemObject, FileTypes } from "./FileSystemObject";
import { Directory } from "./Directory";
import { Zip } from "./Zip";

export class TextFile extends FileSystemObject 
{ 
    private textContent: string; 
    private size: number; 
  
    constructor(name: string, parent: Directory, textContent: string) { 
        super(name, parent, FileTypes.TextFile);  
        this.textContent = textContent;
        this.size = textContent.length;
    } 

    public getSize() : number{ 
        return this.size; 
    } 
    public getTextContents() : string{ 
        return this.textContent; 
    } 
    public setTextContents(c: string) { 
        this.textContent = c; 
    } 

    public copy() : TextFile{
        return new TextFile(this.getName(),this.getParent(), this.getTextContents());
    }

    public unzip() : boolean{
        return false;
    }

    public zip() : boolean {
        if(this.getType() == FileTypes.Zip || this.getParent() == null){
            return false;
        }
        let itemcopy = this.copy();
        const zipFile = new Zip(itemcopy.getName()+ ".zip", this.getParent(), itemcopy);
        this.getParent().addEntry(zipFile);   
        return true;
    }
} 