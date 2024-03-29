import { LinkProps, RichTextProps } from '@instantcommerce/sdk';
import { render } from 'storyblok-rich-text-react-renderer';

export const Link = ({ children, to, ...props }: LinkProps) => {
  return (
    <a
      {...props}
      href={to?.url || to?.toString()}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </a>
  );
};

export const RichText = ({
  value,
  blokResolvers,
  defaultBlokResolver,
  markResolvers,
  nodeResolvers,
  defaultStringResolver,
  textResolver,
  ...props
}: RichTextProps) => {
  return (
    <div {...props}>
      {render(value, {
        blokResolvers,
        defaultBlokResolver,
        markResolvers,
        nodeResolvers,
        defaultStringResolver,
        textResolver,
      })}
    </div>
  );
};
