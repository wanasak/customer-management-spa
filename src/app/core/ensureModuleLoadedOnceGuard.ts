export class EnsureModuleLoadedOnceGuard {

    constructor(targetModule: any) {
        throw new Error(`${targetModule} has already been loaded.`);
    }

}
