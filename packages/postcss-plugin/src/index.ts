import type { PluginCreator, AtRule, Rule } from 'postcss';
import selectorParser from 'postcss-selector-parser';

const animationNameRE = /^(-\w+-)?animation-name$/;
const animationRE = /^(-\w+-)?animation$/;

const processedRules = new WeakSet<Rule>();

const plugin: PluginCreator<string> = (id) => {
  const keyframes = Object.create(null);

  return {
    postcssPlugin: 'postcss-plugin-instant-sdk',
    Rule(rule: Rule) {
      if (
        processedRules.has(rule) ||
        (rule.parent &&
          rule.parent.type === 'atrule' &&
          /-?keyframes$/.test((rule.parent as AtRule).name))
      ) {
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
    AtRule(node) {
      if (/-?keyframes$/.test(node.name) && !node.params.endsWith(`-${id}`)) {
        // register keyframes
        keyframes[node.params] = node.params = node.params + '-' + id;
      }
    },
    OnceExit(root) {
      if (Object.keys(keyframes).length) {
        // If keyframes are found, find and rewrite animation names
        // in declarations.
        // individual animation-name declaration
        root.walkDecls((decl) => {
          if (animationNameRE.test(decl.prop)) {
            decl.value = decl.value
              .split(',')
              .map((v) => keyframes[v.trim()] || v.trim())
              .join(',');
          }
          // shorthand
          if (animationRE.test(decl.prop)) {
            decl.value = decl.value
              .split(',')
              .map((v) => {
                const vals = v.trim().split(/\s+/);
                const i = vals.findIndex((val) => keyframes[val]);
                if (i !== -1) {
                  vals.splice(i, 1, keyframes[vals[i]]);
                  return vals.join(' ');
                } else {
                  return v;
                }
              })
              .join(',');
          }
        });
      }
    },
  };
};

plugin.postcss = true;

module.exports = plugin;
