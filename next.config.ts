import withExportImages from "next-export-optimize-images";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
};

export default withExportImages(nextConfig);
