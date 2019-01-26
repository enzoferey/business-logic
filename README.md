# business-logic

Decoupled, clean and well tested business logic.

### Why

After working on numerous frontend applications, I quickly found myself copy pasting chuncks of code from one project to another or just consulting one more time how I did performed some operation that required an immutable modification on an array of objects.

However, all this logic is generally obfuscated by other lines of code around and, at the end, highly coupled to the framework of choice or the project per se.

My intention with this repository is to provide decoupled, clean and well tested business logic that you can copy paste into your projects and have a starting point to build your app's specific logic.

### How it works

The [`modules`](./modules) folder contains a set of different subfolders, one for each module. Each of them is self contained in its repository and has everything it needs to work.

Being the idea to provide out-of-the-box business logic working for every JavaScript project, the modules are written in TypeScript. You can find a JavaScript version of them in the [`dist`](./dist) folder. Be aware that they are not transpiled to vanilla JavaScript, you will still need to run `babel` on them.
