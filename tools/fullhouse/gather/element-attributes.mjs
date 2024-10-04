import FsGatherer from './gatherer.mjs';

/**
 * Returns a dictionary of element attributes and corresponding meta data. Keys in the dictionary
 * will be the element's attribute name (e.g. data-testid or role).
 * @param selector CSS selector used to collect elements (defaults to all elements in the body)
 */
export function collectElementAttributes(selector, prefix) {
  const attributes = {};
  for (const element of document.querySelectorAll(selector)) {
    for (const attribute of element.attributes) {
      const { name, value } = attribute;
      if (prefix === undefined || name.toLocaleLowerCase().startsWith(prefix.toLowerCase())) {
        // add initial attribute if this is the first
        if (!attributes[name]) {
          attributes[name] = {
            name,
            count: 0,
            values: [],
          };
        }
        // increment count and values found
        attributes[name].count = attributes[name].count + 1;
        if (attributes[name].values.indexOf(value) === -1) {
          attributes[name].values.push(value);
        }
      }
    }
  }
  return Object.values(attributes);
}

/**
 * Gathers all attributes that exist within HTML elements on a page.
 */
export class ElementAttributesGatherer extends FsGatherer {
  static id = 'ElementAttributes';
  meta = {
    supportedModes: ['navigation', 'snapshot'],
  };
  async gather() {
    return this.evaluate(collectElementAttributes, ['body *']);
  }
}

export class AriaAttributeGatherer extends FsGatherer {
  static id = 'AriaAttributes';
  meta = {
    supportedModes: ['navigation', 'snapshot'],
  };
  async gather() {
    return this.evaluate(collectElementAttributes, ['body *', 'aria-']);
  }
}

export class AriaRoleAttributeGatherer extends FsGatherer {
  static id = 'AriaRoleAttributes';
  meta = {
    supportedModes: ['navigation', 'snapshot'],
  };
  async gather() {
    return this.evaluate(collectElementAttributes, ['body *', 'role']);
  }
}

export class DataAttributeGatherer extends FsGatherer {
  static id = 'DataAttributes';
  meta = {
    supportedModes: ['navigation', 'snapshot'],
  };
  async gather() {
    return this.evaluate(collectElementAttributes, ['body *', 'data-']);
  }
}

// Export all gatherers as default
export default {
  ElementAttributesGatherer,
  AriaAttributeGatherer,
  AriaRoleAttributeGatherer,
  DataAttributeGatherer,
};
