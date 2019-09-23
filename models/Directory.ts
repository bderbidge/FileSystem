import { FileSystemObject, FileTypes } from "./FileSystemObject";
import { Zip } from "./Zip";

export class Directory extends FileSystemObject 
{ 
    private contents: FileSystemObject[]; 
  
    constructor( name: string,  parent: Directory, contents: FileSystemObject[]) { 
        super(name, parent, FileTypes.Directory); 
        this.contents = contents || []; 
    } 

    public getSize() : number { 
        var size = 0; 
        for (let e of this.contents){
            size += e.getSize(); 
        } 
        return size; 
    } 
   
    public deleteFileSystemObject( fileSystemObject: FileSystemObject) : boolean { 
        var index = this.contents.findIndex(item =>  item.getName() === fileSystemObject.getName());
        if(index == -1){
            return false
        }
        this.contents.splice(index, 1); 
        return true;
    } 
  
    public addEntry(fileSystemObject: FileSystemObject) : boolean { 
        let index = 0;
        let count = 0;
        let name: string = ""
        let tempname = fileSystemObject.getName();
        while(index != -1 ){       
            index = this.contents.findIndex(item =>  item.getName()===tempname);
            
            if(index == -1 ){
                fileSystemObject.changeName(tempname);
                break;
            } else{
                count+=1;
                name = fileSystemObject.getName();
                tempname = name+ count.toString();
            }
        }
        fileSystemObject.setParent(this);
        this.contents.push(fileSystemObject); 
        return true;
    } 
  
    public getContents() : FileSystemObject[] { 
        return this.contents; 
    } 

    public copy() : Directory{
        let tempContents = [];
        for(let item of this.contents){
            var itemcopy = item.copy();
            tempContents.push(itemcopy);
        }
        var dirCopy = new Directory(this.getName(), this.getParent(), tempContents);
        return dirCopy;
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