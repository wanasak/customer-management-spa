// Resolve
export class PropertyResolver {
    // @path: string - property string include "."
    // @obj: any - items object
    static resolve(path: string, obj: any) {
        return path.split('.').reduce((prev, curr) => {
            return (prev ? prev[curr] : undefined);
        }, obj || self);
    }
}
