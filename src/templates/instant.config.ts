export const instantConfigTemplate = (organization?: string, previewStoreId?: string) => `module.exports = {
  organization: "${organization}",
  previewStoreId: "${previewStoreId}",
};
`;
