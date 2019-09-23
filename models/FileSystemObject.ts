import { Directory } from "./Directory";


export enum FileTypes {
    TextFile,
    Directory,
    Zip,
}

export abstract class FileSystemObject 
{ 
    
    private  parent: Directory;  
    private  name: string; 
    private fileType: FileTypes;

    public constructor( name: string,  parent: Directory, fileType: FileTypes) { 
        this.name = name; 
        this.parent = parent; 
        this.fileType = fileType;
    } 
  
    public delete() : boolean { 
        if (this.parent == null) {
            return false; 
        }
        return this.parent.deleteFileSystemObject(this); 
    } 
  
    public abstract getSize(): number; 
  
    public changeName( n: string) { 
        this.name = n; 
    } 

    public getName() :string { 
        return this.name; 
    } 

    public getParent(): Directory{
        return this.parent;
    }

    public setParent(directory: Directory): boolean{
        this.parent = directory;
        return true;
    }

    public getType() : FileTypes {
        return this.fileType;
    }

    public move(destination :Directory): boolean{
        if (this.parent != null) {
            this.parent.deleteFileSystemObject(this);    
        }
        destination.addEntry(this);
        this.parent = destination;
        
        return true;
    }

    public abstract copy(): FileSystemObject;
    
    public recursiveCopy(destination: Directory) {
        let itemcopy = this.copy();
        itemcopy.setParent(destination);
        destination.addEntry(itemcopy);    
    }

    public abstract zip(): boolean

    public abstract unzip() : boolean;

} 

