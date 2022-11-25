import { PluginCreator, Rule } from 'postcss';
import selectorParser from 'postcss-selector-parser';

const processedRules = new WeakSet<Rule>();

const plugin: PluginCreator<string> = (id) => {
  return {
    postcssPlugin: 'postcss-plugin-instant-sdk',
    Rule(rule: Rule) {
      if (processedRules.has(rule)) {
        return;
      }

      processedRules.add(rule);

      rule.selector = selectorParser((selectorRoot) => {
        selectorRoot.each((selector) => {
          selector.first.replaceWith(
            selectorParser.className({ value: id! }),
            selectorParser.combinator({ value: ' ' }),
            selector.first,
          );
        });
      }).processSync(rule.selector);
    },
  };
};

plugin.postcss = true;

module.exports = plugin;
