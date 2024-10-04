import { Gatherer } from 'lighthouse';

/**
 * Provides a base `Gatherer` to reduce boilerplate Lighthouse code.
 */
export class FsGatherer extends Gatherer {
  static get id() {
    throw Error('Gatherer must define id');
  }

  // @ts-expect-error `context` initialized when `getArtifact` executes
  context;
  meta = {
    supportedModes: ['navigation', 'snapshot'],
  };

  /**
   * Convenience method to call `evaluate`. The default mode is `useIsolation` `false` to allow access
   * to the JavaScript runtime.
   * @param fn Function to call
   * @param args Arguments to function call
   * @param deps Functions required in addition to the main function
   * @param useIsolation Optional isolation mode; defaults to false
   */
  async evaluate(fn,
                 // @ts-expect-error `args` has an error due to the optional parameter
                 args = [], deps = [], useIsolation = false) {
    return this.context.driver.executionContext.evaluate(fn, {
      args,
      deps,
      useIsolation,
    });
  }

  async getArtifact(context) {
    //console.log(`getting artifacts`)
    // this must be assigned ASAP to allow access to the `Context`
    this.context = context;
    const result = await this.gather();
    return result;
  }
}

export default FsGatherer;
