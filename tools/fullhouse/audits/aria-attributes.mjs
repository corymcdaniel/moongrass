import { Audit } from 'lighthouse';

class AriaAttributesAudit extends Audit {
  static get meta() {
    return {
      id: 'fs-aria-attributes',
      title: 'ARIA Properties and States',
      description: 'ARIA properties and states can be used to give elements extra meaning or semantics. As an example, `aria-required="true"` specifies that a form input needs to be filled in order to be valid. ARIA properties define the current conditions of elements, such as `aria-disabled="true"`, which specifies to a screen reader that a form input is currently disabled. States differ from properties in that properties don\'t change throughout the lifecycle of an app, whereas states can change, generally programmatically via JavaScript.',
      scoreDisplayMode: Audit.SCORING_MODES.BINARY,
      requiredArtifacts: ['AriaAttributes'],
      failureTitle: 'MISSING FS ATTRIBUTES'
    };
  }

  static audit(artifacts) {
    //console.log(artifacts)
    const { AriaAttributes } = artifacts;
    // console.log(`
    //
    // RUNNING ARIA
    //
    // `)
    let results;
    try {
      results = AriaAttributes.sort((a, b) => a.name.localeCompare(b.name)).map(attribute => ({
        name: attribute.name,
        count: attribute.count,
        subItems: {
          type: 'subitems',
          items: [{
            value: attribute.values.length > 10 ? `${attribute.values.slice(0, 10).join(', ')},... (${attribute.values.length - 10} more)` : attribute.values.join(', '),
          }],
        },
      }));
      // console.log(results);
      return {
        score: results?.length > 0 ? 1 : 0,
        details: Audit.makeTableDetails([
          {
            key: 'name', valueType: 'text', label: 'Attribute',
            subItemsHeading: {key: 'value', valueType: 'text'}
          },
          {key: 'count', label: 'Count', valueType: 'numeric', granularity: 1},
        ], results),
        notApplicable: AriaAttributes.length === 0,
      };
    } catch(e) {
      // console.error(e);
      return {
        score: results?.length > 0 ? 1 : 0,
        details: Audit.makeTableDetails([
          {
            key: 'name', valueType: 'text', label: 'Attribute',
            subItemsHeading: {key: 'value', valueType: 'text'}
          },
          {key: 'count', label: 'Count', valueType: 'numeric', granularity: 1},
        ], results),
        notApplicable: AriaAttributes.length === 0,
      };
    }
  }
}

export default AriaAttributesAudit;
