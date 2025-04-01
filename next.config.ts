import withExportImages from 'next-export-optimize-images'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
};

export default withExportImages(nextConfig);
