import {
  definePage,
  Pdp,
  useBlockState,
  usePdpContext,
} from '@instantcommerce/sdk';
import './index.css';

const CustomPdp = () => {
  const { customizer } = useBlockState();
  const { product } = usePdpContext();

  return (
    <div className="p-8 min-h-[600px] bg-gray-200">
      <Pdp.Container>
        <Pdp.ColumnMain>
          <Pdp.Form>
            <Pdp.MainInfo />
            {/* <Pdp.Price /> */}

            <div
              className="text-4xl font-bold mt-4 animate-bounce"
              style={{ color: customizer?.color || '#000' }}
            >
              {product.selectedVariant?.price?.amount}
            </div>

            <Pdp.Rating />

            <Pdp.VariantSelects />
            <Pdp.SellingPlans />
            <Pdp.NotificationMessage />
            <Pdp.AddToCartSection>
              <Pdp.QuantityInput />

              <Pdp.AddToCartButtons />

              <Pdp.PaymentIcons />
            </Pdp.AddToCartSection>
            <Pdp.Details />
            <Pdp.Usps />
          </Pdp.Form>
        </Pdp.ColumnMain>
        <Pdp.ColumnGallery>
          <Pdp.Gallery />
        </Pdp.ColumnGallery>
      </Pdp.Container>
    </div>
  );
};

export default definePage({
  type: 'pdp',
  component: CustomPdp,
  customizerSchema: {
    fields: {
      color: { type: 'text' },
    },
  },
});
