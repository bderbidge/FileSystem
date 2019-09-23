import { Directory } from "./models/Directory";
import { TextFile } from "./models/TextFile";


var root = new Directory("root", null,[]);
var textfile = new TextFile("file1",root,"Hello everyone")
var dir = new Directory("root", null,[]);
var dir1 = new Directory("root", null,[]);
root.addEntry(textfile);
root.addEntry(dir);
root.addEntry(dir1);
var size = root.getSize();
console.log(size);
console.log(textfile.getTextContents());
console.log(root.getContents());
dir1.move(dir);
console.log(dir.getContents().length);
var copyfile = textfile.copy();
dir.addEntry(copyfile);
copyfile.move(dir1);
textfile.delete();
console.log("number of conents: ", root.getContents().length);
dir1.zip();
var parent = dir1.getParent();
var zipfile = parent.getContents()[1];
console.log(zipfile.unzip());

