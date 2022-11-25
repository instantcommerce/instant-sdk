const ESLint = require('eslint').ESLint

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    })
  )
  const filteredFiles = files.filter((_, i) => !isIgnored[i])
  return filteredFiles.join(' ')
}

module.exports = {
  "dashboard/**/*.{js,ts,jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint --max-warnings=0 ${filesToLint} --fix`]
  },
    "storefront/**/*.{js,ts,jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint --max-warnings=0 ${filesToLint} --fix`]
  },
    "packages/**/**/*.{js,ts,jsx,tsx}": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint --max-warnings=0 ${filesToLint} --fix`]
  },
    "*.json": async (files) => {
    const filesToLint = await removeIgnoredFiles(files)
    return [`prettier --write ${filesToLint} --fix`]
  },
}
