/** @type {import('next').NextConfig} */
const repo = 'Harshit-Vavaiya.github.io'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}/`

const nextConfig = {
  assetPrefix: assetPrefix,
  basePath: basePath,
  distDir:"out"
}
module.exports = nextConfig
