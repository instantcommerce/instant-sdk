export const pageTemplate = (
  name: string,
) => `import { definePage, Pdp, useBlockState } from "@instantcommerce/sdk";

const ${name} = () => {
  const { customizer } = useBlockState();

  return (
    <Pdp.Container>
      <Pdp.ColumnMain>
        <Pdp.Form>
          <Pdp.MainInfo />
          <Pdp.Price />

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
  );
};

export default definePage({
  type: "pdp",
  component: ${name},
  customizerSchema: {
    fields: {
      color: { type: "color", label: "Color" },
    },
  },
});
;
`;
