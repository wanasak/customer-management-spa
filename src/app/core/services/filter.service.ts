import { Injectable } from '@angular/core';

import { PropertyResolver } from './property-resolver';

@Injectable()
export class FilterService {

    constructor() {}

    // @items: T[] - generic list  items
    // @filterText: string - text to filter
    // @props: string: - properties which we want to filter

    filter<T>(items: T[], filterText: string, props: string[]) {
        return items.filter((item: T) => {
            let match = false;
            for (let prop of props) {
                if (prop.indexOf('.') > -1) {
                    let value = PropertyResolver.resolve(prop, item);
                    if (value && value.toUpperCase().indexOf(filterText) > -1) {
                        match = true;
                        break;
                    }
                    continue;
                }
                if (item[prop].toString().toUpperCase().indexOf(filterText) > -1) {
                    match = true;
                    break;
                }
            }
            return match;
        });
    }

}
