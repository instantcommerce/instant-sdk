import { definePage, Pdp, useBlockState } from '@instantcommerce/sdk';

const CustomPdp = () => {
  const { customizer } = useBlockState();

  return (
    <div className="p-8 min-h-[600px] bg-gray-800">
      <Pdp.Gallery />

      <div>test</div>
    </div>
  );
};

export default definePage({
  component: CustomPdp,
  customizerSchema: {
    fields: {
      color: { type: 'text' },
    },
  },
});
